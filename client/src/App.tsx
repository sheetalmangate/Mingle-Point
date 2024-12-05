import { useState } from 'react';
import { createBrowserRouter, RouterProvider, RouteObject, Navigate } from 'react-router-dom';
import Login from './pages/Login.js';
// import Register from './pages/Register';
import Home from './pages/Home';
import Chat from './pages/Chat.js';
import { Auth } from './interfaces/auth.js';

function App() {
  const [auth, setAuth] = useState<Auth | null>(null);

  const routes: RouteObject[] = [
    {
      path: '/login',
      element: <Login setAuth={setAuth} />,
    },
    // {
    //   path: '/register',
    //   element: <Register setAuth={setAuth} />,
    // },
    {
      path: '/home',
      element: <Home />, // Replace with your Home component
    },
    {
      path: '/chat',
      element: auth ? <Chat user={auth.user} /> : <Navigate to="/login" />,
    },
    {
      path: '*',
      element: <Navigate to="/login" />,
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <RouterProvider router={router} />
  );
}

export default App;