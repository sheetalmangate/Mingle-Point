import { User } from "../interfaces/user";

interface HomeProps {

    user: User;
  
  }
  
  const Home: React.FC<HomeProps> = ({ user }) => {
  
    return (
  
      <div>
  
        <h1>Home Page</h1>
        <p>Welcome, {user.username}!</p>
      </div>
  
    );
  
  };
  
    export default Home;