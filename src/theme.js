import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      'html, body': {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
      },
      '*::placeholder': {
        color: props.colorMode === 'dark' ? 'gray.500' : 'gray.400',
      },
      '*, *::before, &::after': {
        borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
      }
    }),
  },
  colors: {
    brand: {
      50: '#E6F6FF',
      100: '#BAE3FF',
      200: '#7CC4FA',
      300: '#47A3F3',
      400: '#2186EB',
      500: '#0967D2',
      600: '#0552B5',
      700: '#03449E',
      800: '#01337D',
      900: '#002159',
    },
    darkBg: {
      card: '#1A1B1E',
      hover: '#2D2E33',
      active: '#34363C',
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'lg',
      },
      variants: {
        solid: (props) => ({
          bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.500',
          color: 'white',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.400' : 'brand.600',
          },
        }),
        ghost: (props) => ({
          _hover: {
            bg: props.colorMode === 'dark' ? 'darkBg.hover' : 'gray.100',
          },
        }),
      },
    },
    Card: {
      baseStyle: (props) => ({
        container: {
          bg: props.colorMode === 'dark' ? 'darkBg.card' : 'white',
          borderRadius: 'xl',
          boxShadow: props.colorMode === 'dark' ? 'dark-lg' : 'lg',
          transition: 'all 0.2s ease-in-out',
          _hover: {
            transform: 'translateY(-4px)',
            boxShadow: props.colorMode === 'dark' ? '2xl' : 'xl',
          },
        },
      }),
    },
    Modal: {
      baseStyle: (props) => ({
        overlay: {
          bg: props.colorMode === 'dark' ? 'blackAlpha.800' : 'blackAlpha.600',
        },
        dialog: {
          bg: props.colorMode === 'dark' ? 'darkBg.card' : 'white',
          borderRadius: 'xl',
        },
      }),
    },
    Input: {
      variants: {
        filled: (props) => ({
          field: {
            bg: props.colorMode === 'dark' ? 'darkBg.hover' : 'gray.100',
            _hover: {
              bg: props.colorMode === 'dark' ? 'darkBg.active' : 'gray.200',
            },
            _focus: {
              bg: props.colorMode === 'dark' ? 'darkBg.active' : 'gray.200',
              borderColor: 'brand.500',
            },
          },
        }),
      },
      defaultProps: {
        variant: 'filled',
      },
    },
    Textarea: {
      variants: {
        filled: (props) => ({
          bg: props.colorMode === 'dark' ? 'darkBg.hover' : 'gray.100',
          _hover: {
            bg: props.colorMode === 'dark' ? 'darkBg.active' : 'gray.200',
          },
          _focus: {
            bg: props.colorMode === 'dark' ? 'darkBg.active' : 'gray.200',
            borderColor: 'brand.500',
          },
        }),
      },
      defaultProps: {
        variant: 'filled',
      },
    },
  },
});

export default theme;
