import { useAuth } from '@/contexts/AuthContext';

export const AuthDebug = () => {
  const { user, session, loading } = useAuth();
  
  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-md">
      <h3 className="font-bold mb-2">Auth Debug Info:</h3>
      <div>Loading: {loading ? 'true' : 'false'}</div>
      <div>User: {user ? `${user.email} (${user.id})` : 'null'}</div>
      <div>Session: {session ? 'exists' : 'null'}</div>
      <div>URL Hash: {window.location.hash || 'none'}</div>
    </div>
  );
};