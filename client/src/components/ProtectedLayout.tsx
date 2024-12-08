import { Navigate, Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import { Auth } from '../interfaces/auth';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

interface ProtectedLayoutProps {
  auth: Auth | null;
}

function ProtectedLayout({ auth }: ProtectedLayoutProps) {
  const { isLoggedIn } = useContext(UserContext);

  // If not authenticated, redirect to login
  if (!auth || !isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default ProtectedLayout;