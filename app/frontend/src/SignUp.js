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
import axios from 'axios';  // Import Axios for making API requests

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async () => {
    try {
      // Perform API request to register user
      const response = await axios.post('http://localhost:8000/createuser', {
        name: `${firstName} ${lastName}`,
        username: username,
        email: email,
        password: password,
      });

      if (response.status === 200) {
        // Navigate to sign-in page after successful registration
        navigate('/signin');
      }
    } catch (error) {
      // Display error message if registration fails
      if (error.response) {
        setError(error.response.data.detail);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <Box textAlign="center">
      <SignUpHeader />
      <SignUpForm
        handleSignUp={handleSignUp}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        error={error}
      />
    </Box>
  );
};

const SignUpHeader = () => {
  return (
    <Box textAlign="center" mb={6}>
      <Heading fontSize="3xl" color="primary.blue">Create Your Account</Heading>
    </Box>
  );
};

const SignUpForm = ({ handleSignUp, setFirstName, setLastName, setUsername, setEmail, setPassword, error }) => {
  return (
    <Box my={8} textAlign="left">
      <form onSubmit={(e) => e.preventDefault()}>
        <FormControl>
          <Input
            type="text"
            placeholder="Enter your first name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4}>
          <Input
            type="text"
            placeholder="Enter your last name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4}>
          <Input
            type="text"
            placeholder="Enter your username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl mt={4}>
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
        {error && (
          <Text color="red.500" mt={4} textAlign="center">
            {error}
          </Text>
        )}
        <Text mt={4} fontSize="sm" textAlign="center">
          By signing up, you agree to recon.org’s{' '}
          <Link href="#" color="primary.blue">Privacy Policy</Link> and{' '}
          <Link href="#" color="primary.blue">Terms</Link>.
        </Text>
        <Button
          onClick={handleSignUp}
          width="full"
          mt={4}
          bg="primary.orange"
          color="black"
        >
          Sign Up
        </Button>
      </form>
      <Text mt={4} textAlign="center">
        <Link href="/signin" color="primary.blue">
          Already have an account? Sign In now
        </Link>
      </Text>
    </Box>
  );
};

export default SignUp;
