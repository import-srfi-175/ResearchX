import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const AuthLayout = ({ children }) => {
  return (
    <Flex
      minHeight="100vh"
      width="full"
      align="center"
      justifyContent="center"
      direction="column"
      color="white"
      bgGradient="linear(to-br, primary.blue, primary.orange)"
    >
      <Box
        borderWidth={1}
        px={4}
        width={['95%', '85%', '70%', '60%']}
        maxWidth="550px"
        borderRadius={8}
        textAlign="center"
        boxShadow="lg"
        bg="white"
        color="primary.lightBlue"
      >

        <Box p={6}>
          {children} {/* Render the children routes here */}
        </Box>
      </Box>
    </Flex>
  );
};

export default AuthLayout;
