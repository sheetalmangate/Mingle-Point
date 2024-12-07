import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../interfaces/auth.js';
import { LOGIN } from '../utils/mutations';
import { UserContext } from '../context/UserContext.js';
import React from 'react';


function Login({ setAuth }: { setAuth: (auth: Auth) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN);
  const navigate = useNavigate();
  const { setIsLoggedIn } = React.useContext(UserContext);

  const handleLogin = async () => {
    try {
        console.log(email,password);
      const { data } = await login({ variables: { email, password } });
      setIsLoggedIn(true);
      setAuth(data.login);
      localStorage.setItem('token',data.login.token);
      navigate('/chat'); // Navigate to the chat page
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <div className="text-sm text-center text-gray-400">
      Dont have an account yet?{" "}
      <a href="/Signup" className="font-medium text-pink-500 hover:text-pink-400"
          > 
          Sign Up
          </a>
    </div>
    </div>
  );
}

export default Login;