# Guide: Fixing Module Export Errors in TypeScript/React

## Understanding the Error

The error "SyntaxError: The requested module does not provide an export named 'default'" occurs when:
1. You try to import a module using default import syntax, but the module only has named exports
2. The export and import syntaxes don't match
3. The module path is incorrect

## Step-by-Step Solution

### 1. Check and Fix the Export

#### Incorrect Export Examples:
```typescript
// Wrong: Multiple exports without default
export const MyComponent = () => {
  return <div>Hello</div>;
};

// Wrong: Named export being imported as default
export function MyComponent() {
  return <div>Hello</div>;
}
```

#### Correct Export Examples:
```typescript
// Correct: Default export
export default function MyComponent() {
  return <div>Hello</div>;
}

// Correct: Named export
export function MyComponent() {
  return <div>Hello</div>;
}
```

### 2. Fix the Import Syntax

#### For Default Exports:
```typescript
// Correct default import
import MyComponent from './MyComponent';

// Wrong default import for named export
import MyComponent from './MyComponent'; // This will cause the error if MyComponent is a named export
```

#### For Named Exports:
```typescript
// Correct named import
import { MyComponent } from './MyComponent';

// Wrong named import for default export
import { MyComponent } from './MyComponent'; // This will cause the error if MyComponent is a default export
```

### 3. Best Practices for TypeScript Exports

1. **Use Named Exports for Multiple Items:**
```typescript
// utils/math.ts
export const add = (a: number, b: number): number => a + b;
export const subtract = (a: number, b: number): number => a - b;
```

2. **Use Default Exports for Main Component/Function:**
```typescript
// components/Button.tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;
```

3. **Export Types and Interfaces:**
```typescript
// types/common.ts
export interface User {
  id: string;
  name: string;
  email: string;
}

export type UserRole = 'admin' | 'user' | 'guest';
```

### 4. Troubleshooting Steps

1. **Check File Extensions:**
```typescript
// Correct
import MyComponent from './MyComponent';
import MyComponent from './MyComponent.tsx';

// Wrong
import MyComponent from './MyComponent.ts'; // If it's actually .tsx
```

2. **Verify Module Resolution:**
```typescript
// tsconfig.json
{
  "compilerOptions": {
    "moduleResolution": "node",
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  }
}
```

3. **Check Barrel Exports:**
```typescript
// index.ts (barrel file)
export { default as MyComponent } from './MyComponent';
export * from './types';
```

4. **Debug with TypeScript:**
```typescript
// Add type annotations to verify imports
import type { MyComponent } from './types';
import MyDefaultComponent from './MyComponent';
```

### 5. Common Patterns and Solutions

#### Pattern 1: Component with Types
```typescript
// Button.tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

export default Button;
export type { ButtonProps };
```

#### Pattern 2: Mixed Exports
```typescript
// api.ts
export const fetchData = async () => {
  // ... implementation
};

export type ApiResponse = {
  data: unknown;
  status: number;
};

// Default export for main functionality
export default fetchData;
```

#### Pattern 3: Re-exports
```typescript
// components/index.ts
export { default as Button } from './Button';
export { default as Input } from './Input';
export * from './types';
```

### 6. Testing the Fix

1. **Create a Test Component:**
```typescript
// TestComponent.tsx
import { render } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders without errors', () => {
    expect(() => render(<MyComponent />)).not.toThrow();
  });
});
```

2. **Verify Build:**
```bash
npm run build
```

Remember: Always use consistent export patterns within your project and document them in your team's style guide.