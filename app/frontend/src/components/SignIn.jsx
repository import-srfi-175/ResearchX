import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; 
import '../styles/SignIn.css';

function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Login Result:', result); // Log the result to check token

      const { token } = result;

      if (token) {
        localStorage.setItem('authToken', token); // Store token in localStorage
        login(token); // Assuming login function accepts token for context state
        console.log('Token stored:', token); // Confirm token storage
        navigate('/'); 
      } else {
        throw new Error('Token is undefined'); // Check if token is undefined
      }

    } catch (error) {
      console.error('Error during sign in:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-container">
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
        <button type="submit" disabled={loading}>{loading ? 'Signing In...' : 'Sign In'}</button>
        {error && <p className="error-message">{error}</p>}
        <div className="sign-in-footer">
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          <p>By signing in, you agree to our <a href="/terms">Terms and Conditions</a> and <a href="/privacy">Privacy Policy</a>.</p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
