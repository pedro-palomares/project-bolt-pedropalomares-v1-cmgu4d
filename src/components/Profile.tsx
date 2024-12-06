import React from 'react';
import { User, Mail, Calendar, Shield } from 'lucide-react';
import { useAuth } from '../lib/auth/AuthContext';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="bg-dark-lighter p-8 rounded-lg shadow-lg text-center">
        <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-white mb-2">Acceso Restringido</h2>
        <p className="text-gray-400">Debes iniciar sesión para ver tu perfil</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-dark-lighter rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary/20 to-dark p-6 flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-dark-lighter flex items-center justify-center">
              <User className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">{user.email}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Calendar className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="text-sm text-gray-400">Fecha de registro</p>
                  <p className="text-white">
                    {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;