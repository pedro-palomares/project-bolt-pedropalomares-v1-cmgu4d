import { describe, it, expect, vi } from 'vitest';
import { renderWithProviders, screen } from '../../../test/utils';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../../../components/auth/ProtectedRoute';

// Mock de useAuth0
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isAuthenticated: false,
    isLoading: false,
    user: null
  })
}));

describe('ProtectedRoute', () => {
  const ProtectedComponent = () => <div>Protected Content</div>;

  it('redirects to home when not authenticated', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <ProtectedComponent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('shows loading state while checking authentication', () => {
    vi.mocked(useAuth0).mockReturnValueOnce({
      isAuthenticated: false,
      isLoading: true,
      user: null
    });

    renderWithProviders(
      <MemoryRouter>
        <ProtectedRoute>
          <ProtectedComponent />
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});