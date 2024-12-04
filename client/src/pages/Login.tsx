import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Auth } from '../interfaces/auth.js';
import { LOGIN } from '../utils/mutations';

function Login({ setAuth }: { setAuth: (auth: Auth) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [login] = useMutation(LOGIN);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        console.log(email,password);
      const { data } = await login({ variables: { email, password } });
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
    </div>
  );
}

export default Login;