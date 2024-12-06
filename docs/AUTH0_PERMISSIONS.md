# Configuración de Permisos en Auth0

## Roles del Sistema

### 1. Administrador (admin)
- **Descripción**: Acceso completo al sistema y todas sus funcionalidades
- **Identificador**: `admin`
- **Permisos**:
  - Todos los permisos (`*`)

### 2. Usuario Regular (user)
- **Descripción**: Acceso básico a funcionalidades del sistema
- **Identificador**: `user`
- **Permisos**:
  - `read:profile`
  - `update:profile`
  - `read:blog`

## Permisos Detallados

### Gestión de Perfil
- `read:profile`
  - **Descripción**: Ver información del perfil propio
  - **Roles**: admin, user
  - **Uso**: Acceso a la página de perfil y datos personales

- `update:profile`
  - **Descripción**: Actualizar información del perfil propio
  - **Roles**: admin, user
  - **Uso**: Modificar datos personales y preferencias

### Blog
- `read:blog`
  - **Descripción**: Ver artículos del blog
  - **Roles**: admin, user
  - **Uso**: Acceso a la lectura de artículos

- `write:blog`
  - **Descripción**: Crear y editar artículos del blog
  - **Roles**: admin
  - **Uso**: Gestión de contenido del blog

- `delete:blog`
  - **Descripción**: Eliminar artículos del blog
  - **Roles**: admin
  - **Uso**: Eliminación de contenido del blog

### Gestión de Usuarios
- `read:users`
  - **Descripción**: Ver lista de usuarios
  - **Roles**: admin
  - **Uso**: Acceso al listado de usuarios del sistema

- `manage:users`
  - **Descripción**: Gestionar usuarios (crear, editar, eliminar)
  - **Roles**: admin
  - **Uso**: Administración completa de usuarios

### Gestión de Roles
- `read:roles`
  - **Descripción**: Ver roles del sistema
  - **Roles**: admin
  - **Uso**: Visualización de roles existentes

- `manage:roles`
  - **Descripción**: Gestionar roles y permisos
  - **Roles**: admin
  - **Uso**: Administración de roles y asignación de permisos

## Configuración en Auth0

### 1. Crear Roles
1. Ir a Auth0 Dashboard > User Management > Roles
2. Crear rol "admin"
   - Asignar todos los permisos
3. Crear rol "user"
   - Asignar permisos básicos (read:profile, update:profile, read:blog)

### 2. Configurar API
1. Ir a Auth0 Dashboard > Applications > APIs
2. Seleccionar tu API
3. En la pestaña "Permissions", agregar todos los permisos listados arriba
4. Guardar cambios

### 3. Configurar Rule para Roles
1. Ir a Auth0 Dashboard > Auth Pipeline > Rules
2. Crear nueva regla "Add Roles to Tokens"
3. Usar el siguiente código:

```javascript
function addRolesToTokens(user, context, callback) {
  const namespace = 'https://pedropalomares.com/roles';
  const assignedRoles = (context.authorization || {}).roles || [];

  context.idToken[namespace] = assignedRoles;
  context.accessToken[namespace] = assignedRoles;

  callback(null, user, context);
}
```

### 4. Asignar Roles a Usuarios
1. Ir a Auth0 Dashboard > User Management > Users
2. Seleccionar usuario
3. En la pestaña "Roles", asignar el rol correspondiente

## Validación de Permisos

### Frontend
```typescript
// Ejemplo de uso en componentes
const { hasPermission } = usePermissions();

if (hasPermission('write:blog')) {
  // Mostrar botón de crear artículo
}
```

### Backend
```typescript
// Ejemplo de middleware de autorización
const requirePermission = (permission: string) => {
  return (req, res, next) => {
    const userRole = req.user['https://pedropalomares.com/roles'][0];
    if (hasPermission(userRole, permission)) {
      next();
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  };
};
```

## Consideraciones de Seguridad

1. **Principio de Mínimo Privilegio**
   - Asignar solo los permisos necesarios para cada rol
   - Revisar periódicamente los permisos asignados

2. **Auditoría**
   - Mantener logs de acciones importantes
   - Monitorear intentos de acceso no autorizado

3. **Actualización de Permisos**
   - Documentar cambios en permisos
   - Actualizar esta documentación cuando se modifiquen roles o permisos