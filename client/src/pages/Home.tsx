
import { User } from "../interfaces/user";

interface HomeProps {

    user: User;
  
  }
  
  const Home: React.FC<HomeProps> = ({ user }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-signup">
      <div className="w-full max-w-2xl p-8 bg-gray-900 bg-opacity-90 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-700">
        <h1 className="text-5xl font-extrabold text-center text-white mb-6">Mingle Point</h1>
        <p className="text-2xl text-center text-accentPink mb-4">Welcome, {user.username}!</p>
        <p className="mt-4 text-center text-gray-300 text-lg">
          Good luck on your journey of finding a partner. We wish you all the best!
        </p>
        <div className="mt-8 flex justify-center">
          <div className="w-1/2 h-1 bg-accentPink rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

    export default Home;

