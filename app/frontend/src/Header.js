// Header.js
import React from 'react';
import { Box, Flex, Heading, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
  return (
    <Box bg="white" boxShadow="md">
      <Flex align="center" justify="space-between" p={4} maxW="1200px" mx="auto">
        <Heading as="h1" size="lg" color="primary.blue">
          <Link as={RouterLink} to="/">recon.org</Link>
        </Heading>
      </Flex>
    </Box>
  );
};

export default Header;
