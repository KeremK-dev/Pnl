  import { Box, Grid, Button, Image, Text, useColorMode, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel,
  Input, Textarea, IconButton, useToast, Flex, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FiEdit2, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const BlogCard = ({ blog, onEdit, onDelete }) => {
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
          src={blog.image instanceof File ? URL.createObjectURL(blog.image) : blog.image}
          alt={blog.title}
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
          aria-label="Edit blog"
          variant="solid"
          colorScheme="blue"
          size="sm"
          onClick={() => onEdit(blog)}
        />
        <IconButton
          icon={<FiTrash2 />}
          aria-label="Delete blog"
          variant="solid"
          colorScheme="red"
          size="sm"
          onClick={() => onDelete(blog.id)}
        />
      </Flex>
      <Box p={6}>
        <Text fontSize="xl" fontWeight="bold" mb={3}>
          {blog.title}
        </Text>
        <Text 
          noOfLines={3} 
          color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
          fontSize="sm"
        >
          {blog.content}
        </Text>
      </Box>
    </MotionBox>
  );
};

const Blog = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const fileInputRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: 'New Product Launch',
      content: 'We are excited to announce the launch of our latest product line featuring cutting-edge technology and innovative design.',
      image: 'https://via.placeholder.com/400x200'
    },
    {
      id: 2,
      title: 'Customer Success Story',
      content: 'Read about how our products helped transform the workflow of a leading tech company, resulting in 50% increased productivity.',
      image: 'https://via.placeholder.com/400x200'
    },
    {
      id: 3,
      title: 'Industry Insights',
      content: 'Our experts analyze the latest trends in technology and share predictions for the upcoming year.',
      image: 'https://via.placeholder.com/400x200'
    }
  ]);

  const [editingBlog, setEditingBlog] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setPreviewImage(null);
    onOpen();
  };

  const handleDelete = (blogId) => {
    setBlogs(blogs.filter(b => b.id !== blogId));
    toast({
      title: 'Blog post deleted successfully.',
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
    
    const updatedBlog = {
      id: editingBlog ? editingBlog.id : Date.now(),
      title: formData.get('title'),
      content: formData.get('content'),
      image: imageFile.size > 0 ? imageFile : (editingBlog ? editingBlog.image : 'https://via.placeholder.com/400x200')
    };

    if (editingBlog) {
      setBlogs(blogs.map(b => b.id === editingBlog.id ? updatedBlog : b));
      toast({
        title: 'Blog post updated successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right'
      });
    } else {
      setBlogs([...blogs, updatedBlog]);
      toast({
        title: 'Blog post added successfully.',
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top-right'
      });
    }
    setPreviewImage(null);
    onClose();
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchQuery.toLowerCase())
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
            placeholder="Search blog posts..." 
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
            setEditingBlog(null);
            setPreviewImage(null);
            onOpen();
          }}
        >
          Add Blog Post
        </Button>
      </Flex>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={6}
      >
        {filteredBlogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent>
          <ModalHeader>
            {editingBlog ? 'Edit Blog Post' : 'Add New Blog Post'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSave}>
              <FormControl mb={4}>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  defaultValue={editingBlog?.title}
                  required
                  size="lg"
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Content</FormLabel>
                <Textarea
                  name="content"
                  defaultValue={editingBlog?.content}
                  rows={6}
                  required
                  size="lg"
                />
              </FormControl>

              <FormControl mb={6}>
                <FormLabel>Blog Image</FormLabel>
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
                {editingBlog && !previewImage && (
                  <Image
                    src={editingBlog.image}
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

export default Blog;
