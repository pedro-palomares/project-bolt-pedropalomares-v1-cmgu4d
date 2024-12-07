# Sistema de Autenticación - Documentación Técnica

## 1. Arquitectura General

### Componentes Principales
1. **AuthContext** (`src/lib/auth/AuthContext.tsx`)
   - Manejo del estado de autenticación
   - Provee métodos de login/registro/logout
   - Gestión de usuario actual

2. **Storage** (`src/lib/auth/storage.ts`)
   - Almacenamiento local de datos
   - Gestión de sesiones
   - Persistencia de usuario

3. **Validación** (`src/lib/auth/validation.ts`)
   - Esquemas de validación con Zod
   - Reglas de validación para formularios

4. **Crypto** (`src/lib/auth/crypto.ts`)
   - Funciones de hash y verificación
   - Seguridad de contraseñas

## 2. Flujo de Autenticación

### Registro
```typescript
// 1. Usuario completa formulario
const handleRegister = async (data: RegisterForm) => {
  // 2. Validación de datos
  const validatedData = registerSchema.parse(data);
  
  // 3. Hash de contraseña
  const hashedPassword = await hashPassword(data.password);
  
  // 4. Creación de usuario
  const user = await storage.createUser({
    email: data.email,
    name: data.name,
    hashedPassword
  });
  
  // 5. Creación de sesión
  storage.createSession(user.id);
  
  // 6. Actualización de estado
  setUser(user);
};
```

### Login
```typescript
// 1. Usuario ingresa credenciales
const handleLogin = async (data: LoginForm) => {
  // 2. Validación de datos
  const validatedData = loginSchema.parse(data);
  
  // 3. Verificación de usuario
  const user = await storage.validateUser(
    data.email,
    data.password
  );
  
  // 4. Creación de sesión
  storage.createSession(user.id, data.rememberMe);
  
  // 5. Actualización de estado
  setUser(user);
};
```

## 3. Componentes UI

### Modal de Autenticación
```typescript
// AuthModal.tsx
const AuthModal = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {mode === 'login' ? (
        <LoginForm onSuccess={onClose} />
      ) : (
        <RegisterForm onSuccess={onClose} />
      )}
      <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
        {mode === 'login' ? 'Crear cuenta' : 'Iniciar sesión'}
      </button>
    </Modal>
  );
};
```

### Formularios
```typescript
// LoginForm.tsx
const LoginForm = () => {
  const { register, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input {...register('email')} type="email" />
      <Input {...register('password')} type="password" />
      <Button type="submit">Iniciar Sesión</Button>
    </form>
  );
};
```

## 4. Protección de Rutas

### Middleware de Autenticación
```typescript
// ProtectedRoute.tsx
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};
```

### Redirección Condicional
```typescript
// useRedirectAfterAuth.ts
const useRedirectAfterAuth = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  }, [user]);
};
```

## 5. Almacenamiento y Persistencia

### LocalStorage
```typescript
// storage.ts
class Storage {
  private getUsers(): User[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }
  
  private saveUsers(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }
  
  getCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem('currentUser') || 'null');
  }
  
  setCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
```

### Sesiones
```typescript
// session.ts
interface Session {
  userId: string;
  expiresAt: string;
}

const createSession = (userId: string, rememberMe: boolean) => {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + (rememberMe ? 168 : 24));
  
  const session: Session = {
    userId,
    expiresAt: expiresAt.toISOString()
  };
  
  localStorage.setItem('session', JSON.stringify(session));
};
```

## 6. Validación y Seguridad

### Esquemas de Validación
```typescript
// validation.ts
const registerSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .regex(/^[a-zA-Z\s]+$/, 'Solo letras permitidas'),
  email: z.string()
    .email('Email inválido')
    .toLowerCase(),
  password: z.string()
    .min(8, 'Mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener mayúsculas')
    .regex(/[0-9]/, 'Debe contener números')
});
```

### Encriptación
```typescript
// crypto.ts
export const hashPassword = async (password: string) => {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};
```

## 7. Gestión de Errores

### Manejo de Errores
```typescript
// AuthContext.tsx
const login = async (email: string, password: string) => {
  try {
    const user = await storage.validateUser(email, password);
    setUser(user);
    toast.success('Inicio de sesión exitoso');
  } catch (error) {
    logError(error as Error, { context: 'Login' });
    toast.error('Credenciales inválidas');
    throw error;
  }
};
```

### Logging
```typescript
// logger.ts
export const logError = (error: Error, context?: Record<string, any>) => {
  console.error('Error:', {
    message: error.message,
    stack: error.stack,
    ...context
  });
};
```

## 8. Mejores Prácticas

1. **Seguridad**
   - Validación en cliente y servidor
   - Encriptación de contraseñas
   - Manejo seguro de sesiones
   - Protección contra XSS y CSRF

2. **UX**
   - Feedback claro de errores
   - Estados de carga
   - Redirecciones intuitivas
   - Persistencia de sesión

3. **Mantenibilidad**
   - Código modular
   - Tipado fuerte con TypeScript
   - Logging comprensivo
   - Documentación clara

4. **Performance**
   - Lazy loading de componentes
   - Caché de datos de usuario
   - Optimización de re-renders
   - Gestión eficiente de estado