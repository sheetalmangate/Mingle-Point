// Updated auth.ts with consistent token handling and error handling
import { jwtDecode, JwtPayload } from "jwt-decode";

// Interface for token structure
interface UserToken {
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
  // Retrieve and decode user data from the token
  getProfile() {
    const token = this.getToken();
    if (!token) {
      console.warn("No token found.");
      return null;
    }
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      console.log("Decoded token:", decoded); // Add this debug log
      return decoded; // Remove .data if your token doesn't have a data wrapper
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<UserToken>(token);
      return decoded.exp < Date.now() / 1000; // Compare token expiration with current time
    } catch (err) {
      console.error("Failed to decode token:", err);
      return true; // Assume token is expired if decoding fails
    }
  }

  // Retrieve the token from localStorage
  getToken() {
    return localStorage.getItem("token"); // Changed from "id_token" to "token"
  }

  // Save token to localStorage
  login(idToken: string) {
    localStorage.setItem("token", idToken); // Changed from "id_token" to "token"
  }

  // Remove token from localStorage
  logout() {
    localStorage.removeItem("token"); // Changed from "id_token" to "token"
  }

  isTokenValid() {
    const token = this.getToken();
    if (!token) return false;

    try {
      const decoded = jwtDecode<UserToken>(token);
      // Check if token is expired (with 5 minute buffer)
      return decoded.exp > (Date.now() / 1000) - 300;
    } catch {
      return false;
    }
  }

  refreshToken() {
    // Remove expired token
    localStorage.removeItem('token');
    // Redirect to login
    window.location.href = '/';
  }
}

export default new AuthService();