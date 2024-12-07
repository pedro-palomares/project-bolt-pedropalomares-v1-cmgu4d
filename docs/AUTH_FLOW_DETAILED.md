# Documentación del Flujo de Autenticación y Registro

## 1. Autenticación con Auth0

### Validación de Usuario
1. **Inicio del Proceso**
   - El usuario hace clic en "Iniciar Sesión"
   - Se redirige a Auth0 usando `loginWithRedirect()`
   - Auth0 maneja la autenticación

2. **Tokens Utilizados**
   ```typescript
   // ID Token: Contiene información del usuario
   interface IdToken {
     sub: string;          // ID único del usuario
     email: string;
     name: string;
     [key: string]: any;   // Claims personalizados
   }

   // Access Token: Para acceder a recursos protegidos
   interface AccessToken {
     aud: string;          // Audience (API)
     exp: number;          // Expiración
     scope: string;        // Permisos
   }

   // Refresh Token: Para renovar tokens expirados
   // Almacenado seguramente por Auth0 SDK
   ```

3. **Verificación de Roles**
   ```typescript
   // Los roles se obtienen del token usando un namespace personalizado
   const userRole = user['https://pedropalomares.com/roles']?.[0];
   
   // Se almacenan en el estado global
   setAuth(true, { ...user, role: userRole }, accessToken);
   ```

## 2. Registro de Usuarios

### Proceso de Registro
1. **Creación en Auth0**
   - Usuario se registra a través de Auth0
   - Auth0 genera un ID único (`sub`)
   - Se asigna rol por defecto ('user')

2. **Sincronización con Base de Datos**
   ```typescript
   // Cuando el usuario se autentica por primera vez
   async function handleFirstLogin(user: Auth0User) {
     const existingUser = await prisma.user.findUnique({
       where: { auth0Id: user.sub }
     });

     if (!existingUser) {
       await prisma.user.create({
         data: {
           auth0Id: user.sub,
           email: user.email,
           name: user.name,
           role: 'user'
         }
       });
     }
   }
   ```

3. **Campos Almacenados**
   ```typescript
   interface UserRecord {
     id: string;           // ID interno
     auth0Id: string;      // ID de Auth0
     email: string;
     name: string;
     role: string;
     createdAt: Date;
     updatedAt: Date;
   }
   ```

## 3. Sincronización Auth0-DB

### Estrategia de Sincronización
1. **Verificación en Cada Login**
   ```typescript
   async function syncUserOnLogin(auth0User: Auth0User) {
     const dbUser = await prisma.user.findUnique({
       where: { auth0Id: auth0User.sub }
     });

     if (!dbUser) {
       // Crear usuario en DB
       return handleFirstLogin(auth0User);
     }

     // Actualizar información si es necesario
     if (dbUser.email !== auth0User.email || dbUser.name !== auth0User.name) {
       await prisma.user.update({
         where: { id: dbUser.id },
         data: {
           email: auth0User.email,
           name: auth0User.name
         }
       });
     }
   }
   ```

2. **Manejo de Discrepancias**
   ```typescript
   async function handleUserDiscrepancy(auth0Id: string) {
     const auth0User = await auth0Management.getUser({ id: auth0Id });
     const dbUser = await prisma.user.findUnique({
       where: { auth0Id }
     });

     if (!dbUser && auth0User) {
       // Usuario existe en Auth0 pero no en DB
       await handleFirstLogin(auth0User);
     }
   }
   ```

## 4. Manejo de Errores y Logs

### Sistema de Logging
```typescript
// Errores de Autenticación
logError(error, {
  context: 'Autenticación',
  userId: user?.sub,
  error: error instanceof Error ? error.message : 'Error desconocido'
});

// Eventos de Autenticación
logInfo('Usuario autenticado correctamente', {
  userId: user.sub,
  email: user.email,
  role: userRole
});

// Advertencias
logWarning('Usuario no encontrado en base de datos local', {
  auth0Id: user.sub,
  email: user.email
});
```

### Ubicación de Logs
- **Desarrollo**: `console.log` con niveles detallados
- **Producción**: Winston logger configurado para:
  - Errores críticos → Sentry
  - Logs de aplicación → Almacenamiento persistente
  - Eventos de seguridad → Sistema de monitoreo

## 5. Recomendaciones de Mejora

### 1. Sincronización Automática
```typescript
// Implementar un job periódico
async function syncUsers() {
  const auth0Users = await auth0Management.getUsers();
  const dbUsers = await prisma.user.findMany();

  // Identificar discrepancias
  const auth0Ids = new Set(auth0Users.map(u => u.user_id));
  const dbIds = new Set(dbUsers.map(u => u.auth0Id));

  // Sincronizar usuarios faltantes
  for (const auth0User of auth0Users) {
    if (!dbIds.has(auth0User.user_id)) {
      await handleFirstLogin(auth0User);
    }
  }
}
```

### 2. Caché de Roles
```typescript
// Implementar caché de roles para reducir llamadas a DB
const roleCache = new Map<string, string>();

async function getUserRole(auth0Id: string): Promise<string> {
  if (roleCache.has(auth0Id)) {
    return roleCache.get(auth0Id)!;
  }

  const user = await prisma.user.findUnique({
    where: { auth0Id },
    select: { role: true }
  });

  if (user) {
    roleCache.set(auth0Id, user.role);
    return user.role;
  }

  return 'user'; // Rol por defecto
}
```

### 3. Validación Mejorada
```typescript
// Implementar validación más robusta
async function validateUserAccess(auth0Id: string, requiredRole: string) {
  const user = await prisma.user.findUnique({
    where: { auth0Id },
    include: {
      permissions: true,
      sessions: {
        where: {
          expiresAt: {
            gt: new Date()
          }
        }
      }
    }
  });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  if (!hasRequiredRole(user.role, requiredRole)) {
    throw new Error('Acceso denegado');
  }

  return true;
}
```

### 4. Monitoreo Proactivo
```typescript
// Implementar métricas de autenticación
interface AuthMetrics {
  loginAttempts: number;
  successfulLogins: number;
  failedLogins: number;
  uniqueUsers: Set<string>;
  averageLoginTime: number;
}

const metrics: AuthMetrics = {
  loginAttempts: 0,
  successfulLogins: 0,
  failedLogins: 0,
  uniqueUsers: new Set(),
  averageLoginTime: 0
};

function trackAuthMetrics(event: AuthEvent) {
  metrics.loginAttempts++;
  if (event.success) {
    metrics.successfulLogins++;
    metrics.uniqueUsers.add(event.userId);
  } else {
    metrics.failedLogins++;
  }
}
```

### 5. Seguridad Adicional
```typescript
// Implementar verificación adicional de seguridad
async function enhanceSecurityChecks(user: Auth0User) {
  // Verificar intentos de login fallidos
  const failedAttempts = await prisma.loginAttempt.count({
    where: {
      userId: user.sub,
      success: false,
      createdAt: {
        gt: new Date(Date.now() - 30 * 60 * 1000) // últimos 30 minutos
      }
    }
  });

  if (failedAttempts > 5) {
    throw new Error('Cuenta bloqueada temporalmente');
  }

  // Verificar ubicación de login
  const lastLogin = await prisma.loginHistory.findFirst({
    where: { userId: user.sub },
    orderBy: { createdAt: 'desc' }
  });

  if (lastLogin && isUnusualLocation(lastLogin.location)) {
    // Enviar notificación de login sospechoso
    await sendSecurityAlert(user.email);
  }
}
```