import React from 'react';
import { User, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../lib/auth/AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-dark py-12 px-4">
      <div className="max-w-3xl mx-auto">
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

            <div className="pt-6 border-t border-gray-800">
              <button
                onClick={logout}
                className="px-4 py-2 bg-red-600/10 text-red-500 rounded-md hover:bg-red-600/20 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;