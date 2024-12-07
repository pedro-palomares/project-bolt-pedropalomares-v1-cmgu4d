import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen, waitFor } from '../../../test/utils';
import userEvent from '@testing-library/user-event';
import { useAuth } from '../AuthContext';
import { AuthProvider } from '../AuthProvider';

// Mock de useAuth0
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isAuthenticated: false,
    isLoading: false,
    loginWithRedirect: vi.fn(),
    logout: vi.fn(),
    user: null,
    getAccessTokenSilently: vi.fn()
  })
}));

describe('Authentication System', () => {
  const TestComponent = () => {
    const { isAuthenticated, login, logout } = useAuth();
    return (
      <div>
        {isAuthenticated ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}
      </div>
    );
  };

  it('renders login button when not authenticated', () => {
    renderWithProviders(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );
    
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles login action', async () => {
    const user = userEvent.setup();
    const { loginWithRedirect } = vi.mocked(useAuth0());

    renderWithProviders(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await user.click(screen.getByRole('button', { name: /login/i }));
    
    expect(loginWithRedirect).toHaveBeenCalled();
  });
});