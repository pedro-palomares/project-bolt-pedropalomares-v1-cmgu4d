# Flujo de Autenticación y Redirección

## 1. Proceso de Autenticación

### Inicio de Sesión
1. El usuario hace clic en "Iniciar Sesión" en la navegación
2. Se redirige al usuario a Auth0 para autenticación
3. Auth0 maneja el proceso de login/registro
4. Después de una autenticación exitosa, Auth0 redirige al usuario a `/callback`

### Callback y Redirección
1. El componente `AuthCallback` maneja la respuesta de Auth0
2. Se obtiene el token y la información del usuario
3. Se almacena el token en una cookie segura
4. Se redirige al usuario según su rol:
   - Administradores → `/admin`
   - Usuarios regulares → `/dashboard`
   - Si hay una URL de retorno → `returnTo` especificada

## 2. Lógica de Redirección

### Hook: useRedirectAfterAuth
```typescript
// Maneja la redirección después de la autenticación
const userRole = user['https://pedropalomares.com/roles']?.[0];
const returnTo = new URLSearchParams(window.location.search).get('returnTo');

if (userRole === 'admin') {
  navigate(returnTo || '/admin');
} else {
  navigate(returnTo || '/dashboard');
}
```

### Hook: useRequireAuth
```typescript
// Protege rutas y verifica roles
if (!isAuthenticated) {
  navigate(`/login?returnTo=${encodeURIComponent(location.pathname)}`);
  return;
}

if (requiredRole && userRole !== requiredRole) {
  navigate('/unauthorized');
}
```

## 3. Protección de Rutas

### Componente ProtectedRoute
- Envuelve rutas que requieren autenticación
- Verifica el estado de autenticación
- Redirige a login si no está autenticado
- Verifica roles específicos si se requieren

```typescript
<ProtectedRoute requiredRole="admin">
  <AdminDashboard />
</ProtectedRoute>
```

## 4. Gestión de Sesión

### Cookies de Sesión
- Token almacenado en cookie HttpOnly
- Configuración segura para producción
- Expiración de 7 días
- Verificación en cada solicitud

```typescript
const AUTH_COOKIE_OPTIONS = {
  expires: 7,
  secure: true,
  sameSite: 'lax',
  path: '/'
};
```

## 5. Flujos de Usuario

### Usuario No Autenticado
1. Intenta acceder a ruta protegida
2. Se redirige a `/login`
3. URL original se guarda como `returnTo`
4. Después del login, vuelve a la URL original

### Usuario Autenticado
1. Accede a la aplicación
2. Se verifica el rol automáticamente
3. Se permite o deniega acceso según permisos
4. Se mantiene la sesión activa

### Cierre de Sesión
1. Usuario hace clic en "Cerrar Sesión"
2. Se elimina la cookie de sesión
3. Se limpia el estado de autenticación
4. Se redirige a la página de inicio

## 6. Manejo de Errores

### Errores de Autenticación
- Credenciales inválidas → Mensaje de error
- Sesión expirada → Redirigir a login
- Error de red → Mostrar mensaje y retry

### Errores de Autorización
- Rol incorrecto → Página de unauthorized
- Permiso denegado → Mensaje de error
- Ruta no encontrada → Página 404

## 7. Logging y Monitoreo

### Eventos Registrados
- Intentos de inicio de sesión
- Redirecciones
- Errores de autenticación
- Cambios de rol
- Accesos denegados

```typescript
logInfo('Redirigiendo después de autenticación', {
  userId: user.sub,
  role: userRole,
  returnTo
});

logWarning('Acceso no autorizado a ruta protegida', {
  path: location.pathname,
  requiredRole
});
```

## 8. Seguridad

### Medidas Implementadas
- Tokens JWT seguros
- Cookies HttpOnly
- CSRF Protection
- Rate Limiting
- Validación de roles

### Mejores Prácticas
- Renovación automática de tokens
- Cierre de sesión en múltiples pestañas
- Protección contra ataques XSS
- Auditoría de accesos

## 9. Configuración

### Variables de Entorno
```env
VITE_AUTH0_DOMAIN=dev-as6uwrexg2q3qy2p.eu.auth0.com
VITE_AUTH0_CLIENT_ID=6UtyqQ4AIVSwgggiVy40ag1WH7q6j9nI
VITE_AUTH0_AUDIENCE=https://dev-as6uwrexg2q3qy2p.eu.auth0.com/api/v2/
VITE_AUTH0_SCOPE="openid profile email"
```

### Auth0 Rules
```javascript
function addRolesToTokens(user, context, callback) {
  const namespace = 'https://pedropalomares.com/roles';
  const assignedRoles = (context.authorization || {}).roles || [];
  
  context.idToken[namespace] = assignedRoles;
  context.accessToken[namespace] = assignedRoles;
  
  callback(null, user, context);
}
```