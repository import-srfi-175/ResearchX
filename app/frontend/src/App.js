import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box, extendTheme, Link, Text, Flex } from '@chakra-ui/react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import LandingPage from './LandingPage';
import MainLayout from './MainLayout';
import AuthLayout from './AuthLayout';

const theme = extendTheme({
  fonts: {
    heading: 'Inika, serif',
    body: 'Inika, serif',
  },
  colors: {
    primary: {
      blue: '#7695FF',
      lightBlue: '#9DBDFF',
      peach: '#FFD7C4',
      orange: '#FF9874',
      lighterPeach: '#FEF3E2',
    },
    accent: {
      lightGray: '#f2f2f2',
      darkGray: '#333333',
    },
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Box>
          <Header />
          <Routes>
            {/* Auth Routes */}
            <Route path="/" element={<AuthLayout><SignIn /></AuthLayout>} />
            <Route path="/signin" element={<AuthLayout><SignIn /></AuthLayout>} />
            <Route path="/signup" element={<AuthLayout><SignUp /></AuthLayout>} />
            
            {/* Main Routes */}
            <Route path="/home" element={<MainLayout><LandingPage /></MainLayout>} />
          </Routes>
          <Footer />
        </Box>
      </Router>
    </ChakraProvider>
  );
};

// Header component
const Header = () => {
  return (
    <Box bg="white" p={4} borderBottom="1px solid" borderColor="accent.darkGray">
      <Flex justify="start" align="center">
        <Link href="#" fontSize="3xl" fontWeight="bold" color="primary.blue">
          recon.org
        </Link>
      </Flex>
    </Box>
  );
};

// Footer component
const Footer = () => {
  return (
    <Box bg="accent.lightGray" p={4} mt={8} textAlign="center" color="accent.darkGray">
      <Flex justify="center" mb={2}>
        <Link href="#" mx={2}>
          Contact
        </Link>
        <Link href="#" mx={2}>
          Privacy
        </Link>
        <Link href="#" mx={2}>
          Terms
        </Link>
      </Flex>
      <Text>&copy; 2024 recon.org</Text>
    </Box>
  );
};

export default App;
