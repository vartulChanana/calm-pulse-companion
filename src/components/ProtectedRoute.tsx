import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading, session } = useAuth();

  console.log('ProtectedRoute - loading:', loading, 'user:', user, 'session:', session); // Debug log

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center animate-fade-in">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('No user found, redirecting to auth'); // Debug log
    return <Navigate to="/auth" replace />;
  }

  console.log('User authenticated, rendering dashboard'); // Debug log
  return <>{children}</>;
};

export default ProtectedRoute;