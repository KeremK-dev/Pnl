import { Box, Grid, Button, Image, Text, useColorMode, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel,
  Input, NumberInput, NumberInputField, IconButton, useToast, Flex, InputGroup, InputLeftElement,
  Badge, Select } from '@chakra-ui/react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const ProductCard = ({ product, onEdit, onDelete }) => {
  const { colorMode } = useColorMode();

  return (
    <MotionBox
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      bg={colorMode === 'dark' ? 'darkBg.card' : 'white'}
      borderRadius="xl"
      overflow="hidden"
      boxShadow={colorMode === 'dark' ? 'dark-lg' : 'lg'}
      _hover={{
        boxShadow: colorMode === 'dark' ? '2xl' : 'xl',
      }}
      position="relative"
    >
      <Box position="relative" overflow="hidden">
        <Image
          src={product.image instanceof File ? URL.createObjectURL(product.image) : product.image}
          alt={product.name}
          w="100%"
          h="200px"
          objectFit="cover"
          transition="transform 0.3s ease-in-out"
          _hover={{ transform: 'scale(1.05)' }}
        />
      </Box>
      <Flex 
        position="absolute" 
        top="4" 
        right="4" 
        gap="2"
      >
        <IconButton
          icon={<FiEdit2 />}
          aria-label="Edit product"
          variant="solid"
          colorScheme="blue"
          size="sm"
          onClick={() => onEdit(product)}
        />
        <IconButton
          icon={<FiTrash2 />}
          aria-label="Delete product"
          variant="solid"
          colorScheme="red"
          size="sm"
          onClick={() => onDelete(product.id)}
        />
      </Flex>
      <Box p={6}>
        <Flex justify="space-between" align="center" mb={3}>
          <Text fontSize="xl" fontWeight="bold">
            {product.name}
          </Text>
          <Badge colorScheme={product.stock > 0 ? 'green' : 'red'}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </Flex>
        <Text 
          fontSize="2xl" 
          fontWeight="bold" 
          color={colorMode === 'dark' ? 'brand.300' : 'brand.500'}
          mb={2}
        >
          ${product.price}
        </Text>
        <Text 
          noOfLines={2} 
          color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
          fontSize="sm"
          mb={3}
        >
          {product.description}
        </Text>
        <Text fontSize="sm" color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
          Stock: {product.stock} units
        </Text>
      </Box>
    </MotionBox>
  );
};

const Products = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const fileInputRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Gaming Laptop XPS 15',
      description: 'High-performance gaming laptop with RTX 3080 and 32GB RAM',
      price: 1299.99,
      stock: 10,
      image: 'https://via.placeholder.com/400x200'
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      description: 'Premium wireless headphones with noise cancellation',
      price: 199.99,
      stock: 25,
      image: 'https://via.placeholder.com/400x200'
    },
    {
      id: 3,
      name: 'Smart Watch Pro',
      description: 'Advanced smartwatch with health monitoring features',
      price: 299.99,
      stock: 0,
      image: 'https://via.placeholder.com/400x200'
    }
  ]);

  const [editingProduct, setEditingProduct] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setPreviewImage(null);
    onOpen();
  };

  const handleDelete = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
    toast({
      title: 'Product deleted successfully.',
      status: 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right'
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const imageFile = formData.get('image');
    
    const updatedProduct = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price')),
      stock: parseInt(formData.get('stock')),
      image: imageFile.size > 0 ? imageFile : (editingProduct ? editingProduct.image : 'https://via.placeholder.com/400x200')
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
      toast({
        title: 'Product updated successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right'
      });
    } else {
      setProducts([...products, updatedProduct]);
      toast({
        title: 'Product added successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right'
      });
    }
    setPreviewImage(null);
    onClose();
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box p={6}>
      <Flex 
        justify="space-between" 
        align="center" 
        mb={8}
        gap={4}
        direction={{ base: 'column', md: 'row' }}
      >
        <InputGroup maxW={{ base: "100%", md: "400px" }}>
          <Input 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
        <Button
          leftIcon={<FiPlus />}
          colorScheme="brand"
          size="lg"
          onClick={() => {
            setEditingProduct(null);
            setPreviewImage(null);
            onOpen();
          }}
        >
          Add Product
        </Button>
      </Flex>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={6}
      >
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent>
          <ModalHeader>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSave}>
              <FormControl mb={4}>
                <FormLabel>Name</FormLabel>
                <Input
                  name="name"
                  defaultValue={editingProduct?.name}
                  required
                  size="lg"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  name="description"
                  defaultValue={editingProduct?.description}
                  required
                  size="lg"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Price</FormLabel>
                <NumberInput defaultValue={editingProduct?.price || 0} min={0} precision={2}>
                  <NumberInputField name="price" required size="lg" />
                </NumberInput>
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Stock</FormLabel>
                <NumberInput defaultValue={editingProduct?.stock || 0} min={0}>
                  <NumberInputField name="stock" required size="lg" />
                </NumberInput>
              </FormControl>

              <FormControl mb={6}>
                <FormLabel>Product Image</FormLabel>
                <Input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  p={2}
                  variant="filled"
                  size="lg"
                />
                {previewImage && (
                  <Image
                    src={previewImage}
                    alt="Preview"
                    mt={4}
                    maxH="200px"
                    borderRadius="lg"
                  />
                )}
                {editingProduct && !previewImage && (
                  <Image
                    src={editingProduct.image}
                    alt="Current"
                    mt={4}
                    maxH="200px"
                    borderRadius="lg"
                  />
                )}
              </FormControl>

              <Flex gap={3}>
                <Button type="submit" colorScheme="brand" size="lg" flex="1">
                  Save
                </Button>
                <Button onClick={onClose} size="lg" flex="1">
                  Cancel
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Products;
