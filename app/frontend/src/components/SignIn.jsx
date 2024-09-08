import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignIn.css'; // Import the CSS file for styling

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null); // To store any error messages
  const [loading, setLoading] = useState(false); // To manage loading state
  const navigate = useNavigate(); // To programmatically navigate

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      // Assuming the JWT token is in result.token
      const { token } = result;

      // Store the JWT token in localStorage
      localStorage.setItem('authToken', token);

      // Redirect to a different page (e.g., dashboard)
      navigate('/'); // Update this to the route you want to redirect to

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-in-container">
      <form className="sign-in-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
        {error && <p className="error-message">{error}</p>}
        <div className="sign-in-footer">
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          <p>
            By signing in, you agree to our <a href="/terms">Terms and Conditions</a> and <a href="/privacy">Privacy Policy</a>.
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
