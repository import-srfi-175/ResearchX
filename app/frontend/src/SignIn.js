import React, { useState } from 'react';
import {
  Box,
  FormControl,
  Input,
  Button,
  Heading,
  Text,
  Link,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import Axios for API requests

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      // Make API request to login endpoint
      const response = await axios.post('http://localhost:8000/login', {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        // If login is successful, navigate to home
        navigate('/home');
      }
    } catch (error) {
      // Handle errors (e.g., user not found, invalid password)
      if (error.response) {
        alert(error.response.data.detail);
      } else {
        alert('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Box textAlign="center">
      <LoginHeader />
      <LoginForm handleSignIn={handleSignIn} setEmail={setEmail} setPassword={setPassword} />
    </Box>
  );
};

const LoginHeader = () => {
  return (
    <Box textAlign="center" mb={6}>
      <Heading fontSize="3xl" color="primary.blue">Sign In to Your Account</Heading>
    </Box>
  );
};

const LoginForm = ({ handleSignIn, setEmail, setPassword }) => {
  return (
    <Box my={8} textAlign="left">
      <form onSubmit={(e) => e.preventDefault()}>
        <FormControl>
          <Input
            type="email"
            placeholder="Enter your email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <Input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>

        <Button
          onClick={handleSignIn}
          width="full"
          mt={4}
          bg="primary.orange"
          color="black"
        >
          Sign In
        </Button>
      </form>
      <Text mt={4} textAlign="center">
        <Link href="/signup" color="primary.blue">
          Create new account? Sign Up now
        </Link>
      </Text>
    </Box>
  );
};

export default SignIn;
