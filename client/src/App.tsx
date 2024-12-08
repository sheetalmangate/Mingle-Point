import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, RouteObject, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login.js';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Chat from './pages/Chat';
import { Auth } from './interfaces/auth.js';
import Profile from './pages/Profile';
import ErrorPage from './pages/ErrorPage.js';
import Authservice from './utils/auth.js';
import ProtectedLayout from './components/ProtectedLayout.js';
import UserProfiles from './pages/UserProfiles.js';
import { UserProvider } from './context/UserContext';

export function App() {
  const [auth, setAuth] = useState<Auth | null>(null);
  console.log('Auth State:', auth);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = Authservice.getProfile();
        if (decodedToken?.data) {
          setAuth({ 
            token, 
            user: {
              _id: decodedToken.data._id.toString(),
              username: decodedToken.data.username,
              email: decodedToken.data.email
            }
          });
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);


  const routes: RouteObject[] = [
    {
      path: '/',
      element: <Login setAuth={setAuth} />,
    },
    {
      path: '/signup',
      element: <Signup setAuth={setAuth} />,
    },
    {
      path: '/',
      element: <ProtectedLayout auth={auth} />,
      children: [
        {
          path: 'home',
          element: auth?.user ? <Home user={auth.user} /> : null,
        },
        {
          path: 'profiles',
          element: auth?.user ? <UserProfiles currentUser={auth.user} /> : null,
        },
        {
          path: 'profile/:userId?',
          element: <Profile />,
        },
        {
          path: 'chat',
          element: auth?.user ? <Chat user={auth.user} /> : null,
        },
      ],
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

