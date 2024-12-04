import  { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.js';
// import Register from './pages/Register';
import Home from './pages/Home';
import Chat from './pages/Chat';
import { Auth } from './interfaces/auth.js';
import Profile from './pages/Profile';

function App() {
  const [auth, setAuth] = useState<Auth | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login setAuth={setAuth} />} />
        {/* <Route path="/register" element={<Register setAuth={setAuth} />} /> */}
        <Route path="/Home" element={<Home />} />
        <Route path="/Profile/:userId?" element={<Profile />} />
        <Route
          path="/Chat"
          element={auth ? <Chat user={auth.user} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/Login" />} />
      </Routes>
    </Router>
  );
}

export default App;