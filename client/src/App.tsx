import { useState } from 'react';
import { createBrowserRouter, RouterProvider, RouteObject, Navigate } from 'react-router-dom';
import Login from './pages/Login.js';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Chat from './pages/Chat';
import { Auth } from './interfaces/auth.js';
import Profile from './pages/Profile';


function App() {
  const [auth, setAuth] = useState<Auth | null>(null);

  const routes: RouteObject[] = [
    {
      path: "/login",
      element: <Login setAuth={setAuth} />,
    },
    {
      path: '/Signup',
      element: <Signup setAuth={setAuth} />,
    },
    {
      path: "/home",
      element: <Home />, // Replace with your Home component
    },
    {
      path: "/profile/:userId?",
      element: <Profile />, // Replace with your Home component
    },
    {
      path: "/chat",
      element: auth ? <Chat user={auth.user} /> : <Navigate to="/login" />,
    },
    {
      path: "*",
      element: <Navigate to="/login" />,
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={router} />
  );
}

export default App;