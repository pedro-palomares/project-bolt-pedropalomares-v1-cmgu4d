import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../test/utils';
import Contact from './Contact';

describe('Contact Component', () => {
  it('renders contact form correctly', () => {
    renderWithProviders(<Contact />);
    
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.type(screen.getByLabelText(/nombre/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.type(screen.getByLabelText(/mensaje/i), 'Test message');
    
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    await waitFor(() => {
      expect(screen.getByText(/mensaje enviado correctamente/i)).toBeInTheDocument();
    });
  });

  it('shows validation errors for invalid data', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Contact />);

    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }));

    await waitFor(() => {
      expect(screen.getByText(/el nombre debe tener al menos 2 caracteres/i)).toBeInTheDocument();
      expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
      expect(screen.getByText(/el mensaje debe tener al menos 10 caracteres/i)).toBeInTheDocument();
    });
  });
});