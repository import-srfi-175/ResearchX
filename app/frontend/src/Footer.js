// Footer.js
import React from 'react';
import { Box, Flex, Link, Text } from '@chakra-ui/react';

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

export default Footer;
