// use this to decode a token and get the user's information out of it
import { jwtDecode } from "jwt-decode";

interface UserToken {
  name: string;
  exp: number;
}

declare module "jwt-decode" {
  export interface JwtPayload {
    data: {
      _id: number;
      username: string;
      email: string;
    };
  }
}

class AuthService {
  // get user data
  getProfile() {
    return jwtDecode(this.getToken() || "");
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<UserToken>(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }

      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken: string) {
    localStorage.setItem("id_token", idToken);
    // DO NOT USE WINDOW.LCATION.ASSIGN HERE - to navigate use the useNavigate hook from RRD
  }

  logout() {
    localStorage.removeItem("id_token");
    // DO NOT USE WINDOW.LCATION.ASSIGN HERE - to navigate use the useNavigate hook from RRD
  }
}

export default new AuthService();
