// LandingPage.js
import React from 'react';
import { Box, Flex, Heading, Input, Button, Text, Grid, GridItem, Stack} from '@chakra-ui/react';
import LandingPageHeader from './LandingPageHeader';

const LandingPage = () => {
  return (
    <Box p={8}>
      <LandingPageHeader />

      {/* Hero Section with Search Bar */}
      <Flex direction="column" align="center" mt={10} mb={16}>
        <Heading as="h1" size="2xl" mb={4} color="primary.blue">
          Discover, Share, and Advance Research
        </Heading>
        <Text fontSize="lg" color="accent.darkGray" mb={8} maxWidth="600px" textAlign="center">
          Explore a vast collection of research papers, collaborate with peers, and stay up-to-date with the latest scientific advancements.
        </Text>
        <Flex width="60%" maxWidth="800px" mb={6}>
          <Input placeholder="Search for papers, authors, or topics..." size="lg" borderColor="accent.lightGray" />
          <Button ml={4} size="lg" bg="primary.orange" color="black">
            Search
          </Button>
        </Flex>
      </Flex>

      {/* Featured Papers Section */}
      <Box mb={16}>
        <Heading as="h2" size="xl" mb={4} color="primary.blue" textAlign="center">
          Featured Papers
        </Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={8}>
          {/* Example Featured Paper Cards */}
          {Array.from({ length: 3 }).map((_, index) => (
            <GridItem key={index} bg="white" borderRadius="md" p={6} boxShadow="md">
              <Text fontWeight="bold" color="primary.blue" fontSize="xl" mb={2}>
                Paper Title {index + 1}
              </Text>
              <Text fontSize="md" color="accent.darkGray" mb={4}>
                Author Names | Published Date
              </Text>
              <Text color="accent.darkGray" fontSize="sm">
                Brief abstract or description of the paper goes here. It provides a quick overview to encourage further reading.
              </Text>
            </GridItem>
          ))}
        </Grid>
      </Box>

      {/* Recent Submissions Section */}
      <Box mb={16}>
        <Heading as="h2" size="xl" mb={4} color="primary.blue" textAlign="center">
          Recent Submissions
        </Heading>
        <Stack spacing={6}>
          {/* Example Recent Submissions List Items */}
          {Array.from({ length: 5 }).map((_, index) => (
            <Box key={index} bg="white" borderRadius="md" p={4} boxShadow="md">
              <Flex justify="space-between" align="center">
                <Box>
                  <Text fontWeight="bold" color="primary.blue">
                    Recent Paper Title {index + 1}
                  </Text>
                  <Text fontSize="sm" color="accent.darkGray">
                    Author Names | Published Date
                  </Text>
                </Box>
                <Button size="sm" bg="primary.orange" color="black">
                  View
                </Button>
              </Flex>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Popular Authors Section */}
      <Box mb={16}>
        <Heading as="h2" size="xl" mb={4} color="primary.blue" textAlign="center">
          Popular Authors
        </Heading>
        <Flex wrap="wrap" justify="center">
          {/* Example Author Cards */}
          {Array.from({ length: 4 }).map((_, index) => (
            <Box key={index} bg="white" borderRadius="md" p={6} m={4} boxShadow="md" width="200px" textAlign="center">
              <Text fontWeight="bold" color="primary.blue" mb={2}>
                Author Name {index + 1}
              </Text>
              <Text fontSize="sm" color="accent.darkGray">
                Number of Publications: {index * 3 + 2}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>

      {/* Call-to-Action Section */}
      <Box bg="primary.lightBlue" p={8} borderRadius="md" textAlign="center" color="white">
        <Heading as="h3" size="lg" mb={4}>
          Ready to Share Your Research?
        </Heading>
        <Text fontSize="md" mb={6}>
          Join our community of researchers and start contributing today!
        </Text>
        <Button size="lg" bg="primary.orange" color="black">
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
