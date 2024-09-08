import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/SignUp.css'; // Import the CSS file for styling

function SignUp() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
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

    // Combine firstName and lastName into a single name field
    const { firstName, lastName, ...rest } = formData;
    const name = `${firstName} ${lastName}`;
    const dataToSend = { name, ...rest };

    try {
      const response = await fetch('http://localhost:8000/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      // Handle successful signup (e.g., redirect user)
      console.log('Signup successful:', result);
      navigate('/signin'); // Redirect to the sign-in page or another page as needed

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
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
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        {error && <p className="error-message">{error}</p>}
        <div className="sign-up-footer">
          <p>Already have an account? <Link to="/signin">Sign In</Link></p>
          <p>
            By signing up, you agree to our <a href="/terms">Terms and Conditions</a> and <a href="/privacy">Privacy Policy</a>.
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
