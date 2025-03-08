import { ChakraProvider, Box, Flex } from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import OrdersAnalytics from './components/OrdersAnalytics'
import Products from './components/Products'
import Blog from './components/Blog'
import theme from './theme'

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Flex minH="100vh" bg="none">
          <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
          <Box
            as="main"
            flex="1"
            ml={{ base: isCollapsed ? '60px' : '240px' }}
            transition="margin 0.3s"
            p="4"
            bg="none"
          >
            <Routes>
              <Route path="/" element={<OrdersAnalytics />} />
              <Route path="/products" element={<Products />} />
              <Route path="/blog" element={<Blog />} />
            </Routes>
          </Box>
        </Flex>
      </Router>
    </ChakraProvider>
  )
}

export default App
