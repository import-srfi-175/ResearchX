import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Use the named export

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token
        if (decoded) {
          setUserName(decoded.user_name); // Adjust according to your JWT structure
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Invalid token', error);
        setIsAuthenticated(false);
        setUserName('');
      }
    } else {
      setIsAuthenticated(false);
      setUserName('');
    }
  }, []);

  const login = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode the token
        if (decoded) {
          setUserName(decoded.user_name); // Adjust according to your JWT structure
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUserName('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
