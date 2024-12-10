import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Navigation = () => {
  const { username, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Navigate to login page
    navigate('/');
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/home" className="text-white hover:text-blue-100">Home</Link>
          <Link to="/profiles" className="text-white hover:text-blue-100">Profiles</Link>
          <Link to="/chat" className="text-white hover:text-blue-100">Chat</Link>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-white">Welcome, {username}!</span>
          <Link to="/profile" className="text-white hover:text-blue-100">My Profile</Link>
          <button 
            onClick={handleLogout}
            className="text-white hover:text-blue-100"
          >
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;