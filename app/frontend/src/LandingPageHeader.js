// LandingPageHeader.js
import React from 'react';
import { Box, Flex, Link, Input, InputGroup, InputRightElement, Icon, Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { MdFilterList } from 'react-icons/md';

const LandingPageHeader = () => {
  return (
    <Box bg="white" p={4} borderBottom="1px solid" borderColor="accent.darkGray">
      <Flex justify="space-between" align="center">
        <Link href="#" fontSize="4xl" fontWeight="bold" color="primary.blue">
          recon.org
        </Link>

        <InputGroup maxW="600px" mx="auto">
          <Input placeholder="Search on recon" />
          <InputRightElement>
            <SearchIcon color="primary.blue" />
          </InputRightElement>
          <Menu>
            <MenuButton as={Button} variant="ghost">
              <Icon as={MdFilterList} color="primary.blue" />
            </MenuButton>
            <MenuList>
              <MenuItem>Physics</MenuItem>
              <MenuItem>Mathematics</MenuItem>
              <MenuItem>Statistics</MenuItem>
              <MenuItem>Computer Science</MenuItem>
            </MenuList>
          </Menu>
        </InputGroup>

        <Flex>
          <Link href="#" mx={2} color="primary.blue">
            Recent
          </Link>
          <Link href="#" mx={2} color="primary.blue">
            Featured
          </Link>
          <Link href="#" mx={2} color="primary.blue">
            About
          </Link>
          <Link href="#" mx={2} color="primary.blue">
            Log In
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default LandingPageHeader;
