import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 py-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-pink-500">Mingle Point</h1>
          <nav>
            <button
              onClick={handleSignUp}
              className="px-4 py-2 bg-pink-600 rounded-md hover:bg-pink-700 transition duration-300"
            >
              Sign Up
            </button>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-16">
        <section className="text-center">
          <h2 className="text-5xl font-bold mb-4 text-pink-500">Welcome to Mingle Point</h2>
          <p className="text-lg mb-8 text-gray-300">
            Find your perfect match and start your journey with us. Join
            Mingle Point today and meet amazing people around you.
          </p>
          <button
            onClick={handleSignUp}
            className="px-6 py-3 bg-pink-600 rounded-md text-lg font-medium hover:bg-pink-700 transition duration-300"
          >
            Get Started
          </button>
        </section>
        <section className="mt-16">
          <h3 className="text-4xl font-bold mb-6 text-center text-pink-500">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h4 className="text-2xl font-bold mb-2 text-pink-500">Profile Customization</h4>
              <p className="text-gray-300">Create a profile that stands out and attracts the right people.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h4 className="text-2xl font-bold mb-2 text-pink-500">Advanced Matching</h4>
              <p className="text-gray-300">Our advanced algorithms help you find the perfect match.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
              <h4 className="text-2xl font-bold mb-2 text-pink-500">Secure Messaging</h4>
              <p className="text-gray-300">Communicate securely with your matches through our platform.</p>
            </div>
          </div>
        </section>
        <section className="mt-16">
          <h3 className="text-4xl font-bold mb-6 text-center text-pink-500">Get Started</h3>
          <div className="flex justify-center">
            <button
              onClick={handleSignUp}
              className="px-6 py-3 bg-pink-600 rounded-md text-lg font-medium hover:bg-pink-700 transition duration-300"
            >
              Sign Up Now
            </button>
          </div>
        </section>
      </main>
      <footer className="bg-gray-800 py-6 mt-16">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">&copy; 2023 Mingle Point. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;