import { Navigate, Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { Auth } from '../interfaces/auth';

interface ProtectedLayoutProps {
  auth: Auth | null;
}

function ProtectedLayout({ auth }: ProtectedLayoutProps) {
  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
}

export default ProtectedLayout;