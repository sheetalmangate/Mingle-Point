import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Auth } from "../interfaces/auth.js";
import { LOGIN } from "../utils/mutations";
import { UserContext } from "../context/UserContext.js";
import { useContext } from "react";

function Login({ setAuth }: { setAuth: (auth: Auth) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN);
  const navigate = useNavigate();
  const { setIsLoggedIn, setUsername } = useContext(UserContext);

  const handleLogin = async () => {
    try {
      const { data } = await login({ variables: { email, password } });
      setIsLoggedIn(true);
      setUsername(data.login.user.username);
      setAuth(data.login);
      localStorage.setItem("token", data.login.token);
      navigate("/home");
    } catch (error) {
      console.error("Failed to log in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-signup">
    <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 bg-opacity-80 backdrop-blur-lg rounded-2xl shadow-2xl">
      <h2 className="text-4xl font-extrabold text-center text-white">Login to Mingle Point Account!</h2>
      <form className="mt-8 space-y-6" onSubmit={handleLogin}>
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentPink focus:border-accentPink sm:text-sm"
              placeholder="Email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-gray-900 placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-accentPink focus:border-accentPink sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-accentPink text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accentPink"
        >
          Login
        </button>
      </form>
      <div className="text-sm text-center text-gray-400">
        Don't have an account?{" "}
        <a
          href="/signup"
          className="font-medium text-accentPink hover:text-pink-500"
        >
          Sign Up
        </a>
      </div>
    </div>
  </div>
);
}


export default Login;
