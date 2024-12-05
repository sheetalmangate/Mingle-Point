import  { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login.js';
// import Register from './pages/Register';
// import Home from './pages/Home';
import Chat from './pages/Chat.js';
import { Auth } from './interfaces/auth.js';

function App() {
  const [auth, setAuth] = useState<Auth | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login setAuth={setAuth} />} />
        {/* <Route path="/register" element={<Register setAuth={setAuth} />} /> */}
        <Route path="/Home" />
        <Route path="/Chat" element={auth ? <Chat user={auth.user} /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/Login" />} />
      </Routes>
    </Router>
  );
}

export default App;