import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { UserContext } from '../context/UserContext.js';
import { Auth } from '../interfaces/auth.js';
import { ADD_USER } from '../utils/mutations';



function Register({ setAuth }: { setAuth: (auth: Auth) => void }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsLoggedIn } = React.useContext(UserContext);
  const [addUser] = useMutation(ADD_USER);

  const handleregister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     const { data } = await addUser({ variables: { username, email, password } });
      setIsLoggedIn(true);
      setAuth(data.addUser);
      localStorage.setItem('token',data.addUser.token);
      navigate('/home'); // Redirecting to the home page after login
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-white">Join Us!</h2>
        <p className="text-sm text-center text-gray-400">
          Sign up and find your perfect match today!
        </p>
        <form className="mt-8 space-y-6" onSubmit={handleregister}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-sm font-medium text-white bg-pink-600 border border-transparent rounded-lg shadow-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-sm text-center text-gray-400">
          Already have an account?{" "}
          <a
            href="/"
            className="font-medium text-pink-500 hover:text-pink-400"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
  
};

export default Register;

