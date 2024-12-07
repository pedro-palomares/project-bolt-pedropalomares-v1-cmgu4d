import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { registerWithEmail } from '../lib/firebase/auth';
import SEO from '../components/SEO';

const signupSchema = z.object({
  name: z.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'El nombre solo puede contener letras'),
  email: z.string().email('Email inválido'),
  password: z.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

const Signup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignupForm) => {
    try {
      await registerWithEmail(data.email, data.password, data.name);
      toast.success('Registro exitoso');
      navigate('/dashboard');
    } catch (error) {
      if (error instanceof Error && error.message.includes('email-already-in-use')) {
        toast.error('Este email ya está registrado');
      } else {
        toast.error('Error al registrar usuario');
      }
    }
  };

  return (
    <>
      <SEO 
        title="Registro - Pedro Palomares Digital Coach"
        description="Crea tu cuenta para acceder a recursos exclusivos y consultas personalizadas."
      />
      
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          <div className="bg-dark-lighter p-8 rounded-lg shadow-lg border border-gray-800">
            <h1 className="text-2xl font-bold text-white mb-6 text-center">
              Crear Cuenta
            </h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Nombre
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...register('name')}
                    type="text"
                    id="name"
                    className="w-full pl-10 pr-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white"
                    placeholder="Tu nombre completo"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full pl-10 pr-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white"
                    placeholder="tu@email.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...register('password')}
                    type="password"
                    id="password"
                    className="w-full pl-10 pr-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white"
                    placeholder="********"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
                  Confirmar Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    id="confirmPassword"
                    className="w-full pl-10 pr-4 py-2 bg-dark border border-gray-700 rounded-md focus:ring-primary focus:border-primary text-white"
                    placeholder="********"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Creando cuenta...
                  </>
                ) : (
                  'Crear Cuenta'
                )}
              </button>
            </form>

            <p className="mt-6 text-center text-gray-400">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-primary hover:text-primary-light">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;