import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Navigation = () => {
  const { username } = useContext(UserContext);

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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;