import { Box, Flex, IconButton, useColorMode, VStack, Text, Tooltip } from '@chakra-ui/react';
import { FiMenu, FiX, FiSun, FiMoon, FiShoppingBag, FiPackage, FiEdit } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: FiShoppingBag, label: 'Orders & Analytics' },
    { path: '/products', icon: FiPackage, label: 'Products' },
    { path: '/blog', icon: FiEdit, label: 'Blog' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <MotionBox
      position="fixed"
      left={0}
      top={0}
      h="100vh"
      w={isCollapsed ? '60px' : '240px'}
      bg={colorMode === 'dark' ? 'darkBg.card' : 'white'}
      borderRight="1px solid"
      borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
      transition="width 0.3s ease"
      zIndex={2}
      boxShadow={colorMode === 'dark' ? 'dark-lg' : 'lg'}
    >
      <Flex direction="column" h="full" py={4}>
        <Flex px={4} justify={isCollapsed ? 'center' : 'flex-end'} mb={8}>
          <IconButton
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            icon={isCollapsed ? <FiMenu /> : <FiX />}
            onClick={() => setIsCollapsed(!isCollapsed)}
            variant="ghost"
            color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
            _hover={{
              bg: colorMode === 'dark' ? 'darkBg.hover' : 'gray.100',
            }}
          />
        </Flex>

        <VStack spacing={2} align="stretch" flex={1}>
          {navItems.map((item) => (
            <Tooltip
              key={item.path}
              label={isCollapsed ? item.label : ''}
              placement="right"
              isDisabled={!isCollapsed}
            >
              <Box
                as={Link}
                to={item.path}
                px={4}
                py={3}
                display="flex"
                alignItems="center"
                color={isActive(item.path) ? (colorMode === 'dark' ? 'brand.300' : 'brand.500') : (colorMode === 'dark' ? 'gray.400' : 'gray.600')}
                bg={isActive(item.path) ? (colorMode === 'dark' ? 'darkBg.hover' : 'gray.100') : 'transparent'}
                _hover={{
                  bg: colorMode === 'dark' ? 'darkBg.hover' : 'gray.100',
                  color: colorMode === 'dark' ? 'brand.300' : 'brand.500',
                }}
                transition="all 0.2s"
                borderRadius="lg"
              >
                <Box as={item.icon} fontSize="20px" />
                {!isCollapsed && (
                  <Text ml={4} fontWeight={isActive(item.path) ? 'semibold' : 'medium'}>
                    {item.label}
                  </Text>
                )}
              </Box>
            </Tooltip>
          ))}
        </VStack>

        <Flex px={4} mt={4}>
          <Tooltip
            label={isCollapsed ? (colorMode === 'dark' ? 'Light Mode' : 'Dark Mode') : ''}
            placement="right"
            isDisabled={!isCollapsed}
          >
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'dark' ? <FiSun /> : <FiMoon />}
              onClick={toggleColorMode}
              variant="ghost"
              w={isCollapsed ? 'full' : 'auto'}
              color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
              _hover={{
                bg: colorMode === 'dark' ? 'darkBg.hover' : 'gray.100',
                color: colorMode === 'dark' ? 'yellow.300' : 'blue.500',
              }}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </MotionBox>
  );
};

export default Sidebar;
