import React from 'react';
import { useRedirectAfterAuth } from '../../lib/auth/hooks/useRedirectAfterAuth';

const AuthCallback = () => {
  const { isLoading } = useRedirectAfterAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return null;
};

export default AuthCallback;