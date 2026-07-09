import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi } from '../pages/Auth/services/authApi';
import { SessionExpiredModal } from '../components/SessionExpiredModal';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isLoadingRef = React.useRef(true); // Tracks initial load synchronously
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const data = await authApi.fetchMe();
        setUser(data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
        isLoadingRef.current = false;
      }
    };

    checkSession();

    const handleGlobalLogout = () => {
      // If we are still in the initial page load phase, DO NOT show the modal!
      // This means the user is just a guest or their 30-day session completely died while offline.
      // They have no active state to rescue, so AdminGuard should just cleanly redirect them to /login.
      if (isLoadingRef.current) return;

      // Only pop up the session expired modal if the user is actively in the admin portal
      // and NOT already on an authentication page.
      const isAuthPage = ['/login', '/signup', '/forgot-password'].some(p => window.location.pathname.startsWith(p));
      const isAdminRoute = window.location.pathname.startsWith('/admin');
      const isAdminDomain = window.location.hostname.startsWith('admin.');
      
      if (!isAuthPage && (isAdminRoute || isAdminDomain)) {
        setIsSessionExpired(true);
      }
    };

    window.addEventListener('auth:logout', handleGlobalLogout);

    return () => {
      window.removeEventListener('auth:logout', handleGlobalLogout);
    };
  }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error('Backend logout failed', err);
    } finally {
      setUser(null);
      setIsSessionExpired(false);
    }
  };

  const handleRenewSuccess = (userData: User) => {
    setUser(userData);
    setIsSessionExpired(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
      {isSessionExpired && (
        <SessionExpiredModal 
          userEmail={user?.email || ''} 
          onRenewSuccess={handleRenewSuccess} 
          onForceLogout={logout} 
        />
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
