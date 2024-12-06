# Interacción Frontend-Backend

## 1. Arquitectura General

### Frontend
- **Framework Principal**: React 18 con TypeScript
- **Build Tool**: Vite
- **Estado Global**: 
  - Zustand para estado de la aplicación
  - React Query para estado del servidor
- **Routing**: React Router v6
- **Autenticación**: Auth0 React SDK

### Backend
- **API**: REST API con Express
- **Base de Datos**: PostgreSQL con Prisma ORM
- **Autenticación**: Auth0 + JWT
- **Caché**: Redis para almacenamiento en caché

## 2. Flujo de Datos

### Peticiones HTTP
```typescript
// Configuración de Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para tokens
api.interceptors.request.use((config) => {
  const token = getAuthCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Gestión de Estado
```typescript
// React Query para datos del servidor
const { data: posts, isLoading } = useQuery({
  queryKey: ['posts'],
  queryFn: blogApi.getPosts
});

// Zustand para estado local
const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      setAuth: (isAuthenticated, user) => set({ isAuthenticated, user }),
      clearAuth: () => set({ isAuthenticated: false, user: null })
    }),
    {
      name: 'auth-storage'
    }
  )
);
```

## 3. Autenticación y Autorización

### Frontend (Auth0)
```typescript
// Configuración de Auth0
const AUTH0_CONFIG = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  scope: import.meta.env.VITE_AUTH0_SCOPE
};

// Protección de rutas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};
```

### Backend (JWT)
```typescript
// Validación de tokens
const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');
    
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
```

## 4. Base de Datos

### Prisma ORM
```typescript
// Cliente de Prisma
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' 
    ? ['query', 'error', 'warn'] 
    : ['error']
});

// Ejemplo de operación CRUD
async function createPost(data: PostInput) {
  return prisma.post.create({
    data: {
      title: data.title,
      content: data.content,
      authorId: data.authorId
    }
  });
}
```

## 5. Caché y Optimización

### React Query
```typescript
// Configuración de caché
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      cacheTime: 1000 * 60 * 30, // 30 minutos
      refetchOnWindowFocus: false
    }
  }
});
```

### Backend Caching
```typescript
// Middleware de caché
const cacheMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const key = `cache:${req.originalUrl}`;
  const cached = await redis.get(key);
  
  if (cached) {
    return res.json(JSON.parse(cached));
  }
  
  next();
};
```

## 6. Logging y Monitoreo

### Frontend
```typescript
// Sistema de logging
const logger = {
  error: (message: string, context?: any) => {
    console.error(message, context);
    Sentry.captureException(new Error(message), { extra: context });
  },
  
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.info(message, data);
    }
  }
};
```

### Backend
```typescript
// Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
```

## 7. Herramientas de Desarrollo

### Testing
- **Frontend**: Vitest + Testing Library
- **E2E**: Playwright
- **API**: Supertest

### Linting y Formateo
- ESLint
- TypeScript
- Prettier

## 8. Seguridad

### CORS
```typescript
// Configuración de CORS
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Rate Limiting
```typescript
// Limitación de peticiones
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests'
});
```

## 9. Despliegue

### Frontend (Netlify)
```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Backend
- Node.js en producción
- PM2 para gestión de procesos
- Nginx como proxy inverso

## 10. Variables de Entorno

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
VITE_AUTH0_DOMAIN=your-domain
VITE_AUTH0_CLIENT_ID=your-client-id
VITE_AUTH0_AUDIENCE=your-audience
```

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/db
JWT_SECRET=your-secret
REDIS_URL=redis://localhost:6379
```