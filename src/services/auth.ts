import { supabase } from '../lib/db';

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  } | null;
  error: Error | null;
}

export const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Login error:', error);
        throw new Error('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      }

      return {
        user: data.user ? {
          id: data.user.id,
          email: data.user.email!,
          name: data.user.user_metadata.name || ''
        } : null,
        error: null
      };
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        user: null,
        error: new Error(error.message || 'Error al iniciar sesión')
      };
    }
  },

  loginWithGoogle: async (): Promise<void> => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    });

    if (error) {
      console.error('Google login error:', error);
      throw new Error('Error al iniciar sesión con Google');
    }
  },

  register: async (email: string, password: string, name: string): Promise<AuthResponse> => {
    try {
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (existingUser) {
        throw new Error('Este email ya está registrado');
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            email
          }
        }
      });

      if (error) {
        console.error('Registration error:', error);
        throw new Error('Error en el registro. Por favor, inténtalo de nuevo.');
      }

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              email: data.user.email,
              name: name
            }
          ]);

        if (profileError) {
          console.error('Profile creation error:', profileError);
          throw new Error('Error al crear el perfil');
        }
      }

      return {
        user: data.user ? {
          id: data.user.id,
          email: data.user.email!,
          name: name
        } : null,
        error: null
      };
    } catch (error: any) {
      console.error('Registration error:', error);
      return {
        user: null,
        error: new Error(error.message || 'Error en el registro')
      };
    }
  },

  logout: async (): Promise<{ error: Error | null }> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      console.error('Logout error:', error);
      return { error: new Error(error.message || 'Error al cerrar sesión') };
    }
  },

  getCurrentUser: async (): Promise<AuthResponse> => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (!session?.user) {
        return { user: null, error: null };
      }

      return {
        user: {
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata.name || ''
        },
        error: null
      };
    } catch (error: any) {
      console.error('Get current user error:', error);
      return {
        user: null,
        error: new Error(error.message || 'Error al obtener usuario actual')
      };
    }
  }
};