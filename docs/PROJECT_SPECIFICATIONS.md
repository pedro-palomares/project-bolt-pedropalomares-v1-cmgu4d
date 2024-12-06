# Project Specifications

## Core Dependencies

### React and Related Packages
- `react` (^18.2.0): Core React library
- `react-dom` (^18.2.0): React DOM rendering
- `react-router-dom` (^6.22.3): Routing and navigation
- `react-helmet-async` (^2.0.4): Document head management
- `react-hook-form` (^7.51.0): Form handling and validation
- `react-hot-toast` (^2.4.1): Toast notifications

### Authentication
- `@auth0/auth0-react` (^2.2.4): Auth0 integration for React
- `js-cookie` (^3.0.5): Cookie management for authentication

### State Management
- `@tanstack/react-query` (^5.24.1): Data fetching and caching
- `zustand` (^4.5.2): State management

### UI and Styling
- `@tailwindcss/typography` (^0.5.10): Typography utilities for Tailwind
- `lucide-react` (^0.344.0): Icon library
- `tailwindcss` (^3.4.1): Utility-first CSS framework

### Data Handling
- `axios` (^1.6.7): HTTP client
- `date-fns` (^3.3.1): Date manipulation
- `marked` (^12.0.0): Markdown parsing
- `zod` (^3.22.4): Schema validation

### Monitoring and Analytics
- `@sentry/react` (^7.107.0): Error tracking
- `react-ga4` (^2.1.0): Google Analytics integration
- `loglevel` (^1.9.1): Logging utility

## Development Dependencies

### Build Tools
- `vite` (^5.1.4): Build tool and dev server
- `@vitejs/plugin-react` (^4.2.1): React plugin for Vite
- `typescript` (^5.2.2): TypeScript support

### Testing
- `@playwright/test` (^1.42.1): E2E testing
- `@testing-library/react` (^14.2.1): React component testing
- `@testing-library/user-event` (^14.5.2): User event simulation
- `vitest` (^1.3.1): Unit testing framework

### Linting and Type Checking
- `eslint` (^8.57.0): Code linting
- `eslint-plugin-react-hooks` (^4.6.0): React Hooks linting
- `eslint-plugin-react-refresh` (^0.4.5): React Refresh linting
- `@types/react` (^18.2.64): React type definitions
- `@types/react-dom` (^18.2.21): React DOM type definitions
- `@types/node` (^20.11.24): Node.js type definitions

### CSS Processing
- `autoprefixer` (^10.4.18): CSS vendor prefixing
- `postcss` (^8.4.35): CSS transformation tool

## Project Structure

### Core Directories
- `/src`: Source code
  - `/components`: React components
  - `/lib`: Utility libraries
  - `/pages`: Page components
  - `/services`: API services
  - `/config`: Configuration files
  - `/utils`: Utility functions

### Configuration Files
- `vite.config.ts`: Vite configuration
- `tailwind.config.js`: Tailwind CSS configuration
- `tsconfig.json`: TypeScript configuration
- `eslint.config.js`: ESLint configuration

### Environment Files
- `.env.development`: Development environment variables
- `.env.production`: Production environment variables
- `.env.example`: Example environment variables

## Features

### Authentication
- Auth0 integration
- Role-based access control
- Protected routes
- Session management

### UI/UX
- Responsive design
- Dark theme
- Toast notifications
- Loading states
- Error boundaries

### Performance
- Code splitting
- Lazy loading
- Asset optimization
- Cache management

### Development
- Hot module replacement
- TypeScript support
- ESLint integration
- Testing setup

### Monitoring
- Error tracking with Sentry
- Analytics with GA4
- Structured logging

## Development Workflow

### Commands
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run test`: Run tests
- `npm run lint`: Lint code

### Environment Setup
1. Copy `.env.example` to `.env.development`
2. Configure Auth0 credentials
3. Set up required API keys
4. Configure deployment settings

### Testing Strategy
- Unit tests with Vitest
- Component tests with Testing Library
- E2E tests with Playwright
- Test coverage reporting

### Deployment
- Netlify integration
- Environment variable management
- Build optimization
- Cache control

## Security Measures

### Authentication
- JWT token management
- Secure cookie handling
- Role-based authorization
- Session timeout handling

### API Security
- CORS configuration
- Rate limiting
- Input validation
- Error handling

### Frontend Security
- XSS prevention
- CSRF protection
- Secure headers
- Content security policy

## Monitoring and Logging

### Error Tracking
- Sentry integration
- Error boundaries
- Custom error handling
- Error reporting

### Analytics
- Page views
- User events
- Performance metrics
- Custom tracking

### Logging
- Structured logging
- Log levels
- Environment-based configuration
- Error logging

## Performance Optimization

### Build Optimization
- Code splitting
- Tree shaking
- Asset optimization
- Bundle analysis

### Runtime Optimization
- Lazy loading
- Memoization
- Virtual scrolling
- Cache management

### SEO
- Meta tags
- Structured data
- Sitemap
- Robots.txt