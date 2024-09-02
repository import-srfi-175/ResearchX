import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box, Flex, extendTheme, Link, Text, IconButton, useColorMode } from '@chakra-ui/react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import LandingPage from './LandingPage'

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
      lighterPeach: '#FEF3E2'
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
          <Header /> {/* Add the header here */}
          <Flex
            minHeight="100vh"
            width="full"
            align="center"
            justifyContent="center"
            direction="column"
            color="white"
            bgGradient="linear(to-br, primary.blue, primary.orange)" // Add gradient background here
          >
            <Box
              borderWidth={1}
              px={4}
              width="full"
              maxWidth="1200px"
              borderRadius={8}
              textAlign="center"
              boxShadow="lg"
              bg="white"
              color="primary.lightBlue"
            >
              <ThemeSelector />
              <Box p={6}>
                <Routes>
                  <Route path="/" element={<SignIn />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/home" element={<LandingPage />} />
                  
                </Routes>
              </Box>
            </Box>
          </Flex>
          <Footer /> {/* Move the footer outside the box */}
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

// Theme selector component
const ThemeSelector = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box textAlign="right" py={4}>
      <IconButton
        icon={colorMode === 'light' ? 'moon' : 'sun'}
        onClick={toggleColorMode}
        variant="ghost"
      />
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
