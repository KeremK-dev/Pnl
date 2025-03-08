import { Box, Grid, Stat, StatLabel, StatNumber, StatHelpText, Table, Thead, Tbody, Tr, Th, Td, 
  Select, Badge, Input, InputGroup, InputLeftElement, Flex, Text, useColorMode } from '@chakra-ui/react';
import { FiSearch, FiDollarSign, FiShoppingBag, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const OrdersAnalytics = () => {
  const { colorMode } = useColorMode();

  const orders = [
    {
      id: 1,
      customer: 'John Doe',
      cardDetails: '**** **** **** 4242',
      product: 'Gaming Laptop XPS 15',
      amount: 1299.99,
      status: 'Preparing'
    },
    {
      id: 2,
      customer: 'Jane Smith',
      cardDetails: '**** **** **** 5678',
      product: 'Wireless Headphones',
      amount: 199.99,
      status: 'Shipped'
    },
    {
      id: 3,
      customer: 'Mike Johnson',
      cardDetails: '**** **** **** 9012',
      product: 'Smart Watch Pro',
      amount: 299.99,
      status: 'Out of Stock'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Preparing': return 'yellow';
      case 'Shipped': return 'green';
      case 'Out of Stock': return 'red';
      default: return 'gray';
    }
  };

  return (
    <Box p={6}>
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }} gap={6} mb={8}>
        <MotionBox
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          p={6}
          bg={colorMode === 'dark' ? 'darkBg.card' : 'white'}
          borderRadius="xl"
          boxShadow={colorMode === 'dark' ? 'dark-lg' : 'lg'}
          _hover={{
            boxShadow: colorMode === 'dark' ? '2xl' : 'xl',
          }}
        >
          <Stat>
            <Flex align="center" mb={2}>
              <Box as={FiDollarSign} color={colorMode === 'dark' ? 'green.300' : 'green.500'} fontSize="xl" />
              <StatLabel fontSize="lg" ml={2}>Monthly Earnings</StatLabel>
            </Flex>
            <StatNumber fontSize="2xl" color={colorMode === 'dark' ? 'green.300' : 'green.600'}>$12,499.99</StatNumber>
            <StatHelpText color={colorMode === 'dark' ? 'green.300' : 'green.600'}>
              <FiTrendingUp style={{ display: 'inline' }} /> +15.3% from last month
            </StatHelpText>
          </Stat>
        </MotionBox>

        <MotionBox
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          p={6}
          bg={colorMode === 'dark' ? 'darkBg.card' : 'white'}
          borderRadius="xl"
          boxShadow={colorMode === 'dark' ? 'dark-lg' : 'lg'}
          _hover={{
            boxShadow: colorMode === 'dark' ? '2xl' : 'xl',
          }}
        >
          <Stat>
            <Flex align="center" mb={2}>
              <Box as={FiShoppingBag} color={colorMode === 'dark' ? 'blue.300' : 'blue.500'} fontSize="xl" />
              <StatLabel fontSize="lg" ml={2}>Orders This Month</StatLabel>
            </Flex>
            <StatNumber fontSize="2xl" color={colorMode === 'dark' ? 'blue.300' : 'blue.600'}>156</StatNumber>
            <StatHelpText color={colorMode === 'dark' ? 'blue.300' : 'blue.600'}>
              <FiTrendingUp style={{ display: 'inline' }} /> +23.6% from last month
            </StatHelpText>
          </Stat>
        </MotionBox>

        <MotionBox
          whileHover={{ y: -5 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          p={6}
          bg={colorMode === 'dark' ? 'darkBg.card' : 'white'}
          borderRadius="xl"
          boxShadow={colorMode === 'dark' ? 'dark-lg' : 'lg'}
          _hover={{
            boxShadow: colorMode === 'dark' ? '2xl' : 'xl',
          }}
        >
          <Stat>
            <Flex align="center" mb={2}>
              <Box as={FiShoppingBag} color={colorMode === 'dark' ? 'purple.300' : 'purple.500'} fontSize="xl" />
              <StatLabel fontSize="lg" ml={2}>Average Order Value</StatLabel>
            </Flex>
            <StatNumber fontSize="2xl" color={colorMode === 'dark' ? 'purple.300' : 'purple.600'}>$82.45</StatNumber>
            <StatHelpText color={colorMode === 'dark' ? 'purple.300' : 'purple.600'}>
              <FiTrendingUp style={{ display: 'inline' }} /> +5.2% from last month
            </StatHelpText>
          </Stat>
        </MotionBox>
      </Grid>

      <Box
        bg={colorMode === 'dark' ? 'darkBg.card' : 'white'}
        borderRadius="xl"
        boxShadow={colorMode === 'dark' ? 'dark-lg' : 'lg'}
        overflow="hidden"
      >
        <Box p={6}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>Recent Orders</Text>
          <InputGroup mb={6} position="relative">
            <Input 
              placeholder="Search orders..." 
              variant="unstyled"
              size="lg"
              pl="45px"
              bg={colorMode === 'dark' ? 'darkBg.hover' : 'gray.50'}
              border="2px solid"
              borderColor={colorMode === 'dark' ? 'darkBg.active' : 'gray.200'}
              borderRadius="full"
              h="50px"
              _hover={{
                borderColor: colorMode === 'dark' ? 'brand.400' : 'brand.500',
              }}
              _focus={{
                borderColor: colorMode === 'dark' ? 'brand.400' : 'brand.500',
                boxShadow: 'none'
              }}
            />
            <Box
              position="absolute"
              left="3"
              top="50%"
              transform="translateY(-50%)"
              zIndex="2"
              color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}
            >
              <FiSearch size={20} />
            </Box>
          </InputGroup>

          <Box overflowX="auto">
            <Table>
              <Thead>
                <Tr>
                  <Th color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>Customer</Th>
                  <Th color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>Card Details</Th>
                  <Th color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>Product</Th>
                  <Th color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>Amount</Th>
                  <Th color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>Status</Th>
                  <Th color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orders.map((order) => (
                  <Tr key={order.id}>
                    <Td>{order.customer}</Td>
                    <Td>{order.cardDetails}</Td>
                    <Td>{order.product}</Td>
                    <Td>${order.amount}</Td>
                    <Td>
                      <Badge colorScheme={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </Td>
                    <Td>
                      <Select 
                        size="sm" 
                        defaultValue={order.status}
                        variant="filled"
                        bg={colorMode === 'dark' ? 'darkBg.hover' : 'gray.100'}
                        _hover={{
                          bg: colorMode === 'dark' ? 'darkBg.active' : 'gray.200'
                        }}
                      >
                        <option value="Preparing">Preparing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Out of Stock">Out of Stock</option>
                        <option value="Delivered">Delivered</option>
                      </Select>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default OrdersAnalytics;
