import { Grid, Box, Stat, StatLabel, StatNumber, StatHelpText, useColorMode, Heading, SimpleGrid, Icon, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { FiUsers, FiDollarSign, FiActivity, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const MotionBox = motion(Box);

const DashboardCard = ({ title, value, growth, icon }) => {
  const { colorMode } = useColorMode();

  return (
    <MotionBox
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      p={6}
      bg={colorMode === 'dark' ? 'gray.700' : 'white'}
      borderRadius="xl"
      boxShadow="lg"
      border="1px solid"
      borderColor={colorMode === 'dark' ? 'gray.600' : 'gray.100'}
    >
      <Flex justify="space-between" align="center" mb={4}>
        <Icon 
          as={icon} 
          boxSize={8} 
          color={colorMode === 'dark' ? 'blue.300' : 'blue.500'} 
        />
        <Icon 
          as={growth >= 0 ? FiTrendingUp : FiTrendingDown} 
          color={growth >= 0 ? 'green.500' : 'red.500'}
        />
      </Flex>
      <Stat>
        <StatLabel fontSize="lg" color={colorMode === 'dark' ? 'gray.300' : 'gray.600'}>
          {title}
        </StatLabel>
        <StatNumber 
          fontSize="3xl" 
          fontWeight="bold"
          color={colorMode === 'dark' ? 'white' : 'gray.900'}
        >
          {value}
        </StatNumber>
        <StatHelpText 
          fontSize="md"
          color={growth >= 0 ? 'green.500' : 'red.500'}
          fontWeight="medium"
        >
          {growth > 0 ? '+' : ''}{growth}% from last month
        </StatHelpText>
      </Stat>
    </MotionBox>
  );
};

const Dashboard = () => {
  const { colorMode } = useColorMode();
  
  return (
    <Box>
      <Heading 
        mb={8} 
        fontSize="2xl"
        color={colorMode === 'dark' ? 'white' : 'gray.800'}
      >
        Dashboard Overview
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        <DashboardCard 
          title="Total Users" 
          value="1,234" 
          growth={12.5} 
          icon={FiUsers}
        />
        <DashboardCard 
          title="Revenue" 
          value="$45,678" 
          growth={-2.3} 
          icon={FiDollarSign}
        />
        <DashboardCard 
          title="Active Sessions" 
          value="456" 
          growth={8.1} 
          icon={FiActivity}
        />
      </SimpleGrid>
    </Box>
  );
};

export default Dashboard;
