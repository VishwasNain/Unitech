import React, { useState } from 'react';

import { 
  Container, 
  Grid, 
  Typography, 
  Box,
  Card,
  CardContent,
  Button,
  Rating,
  Paper,
  Link,
  CardMedia,
  IconButton,
  TextField,
  Alert
} from '@mui/material';
import { 
  LaptopMac,
  PhoneAndroid,
  Tv,
  Headphones,
  Camera,
  Gamepad,
  Speaker,
  DesktopWindows,
  Computer
} from '@mui/icons-material';
import { Email as EmailIcon, Feedback as FeedbackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { formatPrice } from '../utils/currency';

const HeroSection = styled(Box)(({ theme }) => ({
  height: '600px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  backgroundImage: `url('/images/Herobanner.jpeg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  overflow: 'hidden'
}));

const HeroOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
  zIndex: 1
});

const HeroText = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  mb: 4,
  '& h1': {
    fontSize: { xs: '2.5rem', md: '3.5rem' },
    fontWeight: 700,
    background: 'linear-gradient(45deg, #2196f3 0%, #0d47a1 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: theme.spacing(2)
  },
  '& p': {
    fontSize: { xs: '1.1rem', md: '1.25rem' },
    opacity: 0.9,
    maxWidth: '600px',
    margin: '0 auto',
    marginBottom: theme.spacing(4),
    lineHeight: 1.6
  }
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  cursor: 'pointer'
}));

const Home = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    // Simulate email submission
    setEmailError('');
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      setEmail('');
    }, 3000);
  };

  const handleFeedbackClick = () => {
    window.location.href = '/contact';
  };

  const products = [
    {
      id: 1,
      name: "Apple MacBook Pro M3 16-inch",
      brand: "Apple",
      model: "M3 Pro",
      price: 899.99,
      rating: 4.8,
      description: "Powerful MacBook Pro with M3 chip designed for professionals. Exceptional performance and battery life in a sleek design.",
      specs: {
        processor: "Apple M3",
        ram: "18GB Unified Memory",
        storage: "512GB SSD",
        display: "16-inch Liquid Retina XDR display",
        graphics: "Apple M3 graphics",
        battery: "Up to 22 hours",
        weight: "3.5 pounds",
        color: "Silver"
      },
      images: [
        '/images/M3 pro.png',
        '/images/M3 pro.png',
        '/images/M3 pro.png'
      ],
      category: "Laptops"
    }
  ];

  const categories = [
    {
      id: 1,
      title: 'Laptops',
      color: '#2196F3',
      icon: <LaptopMac sx={{ fontSize: 40 }} />
    },
    {
      id: 2,
      title: 'Desktops',
      color: '#9C27B0',
      icon: <DesktopWindows sx={{ fontSize: 40 }} />
    },
    {
      id: 3,
      title: 'Accessories',
      color: '#FF9800',
      icon: <Computer sx={{ fontSize: 40 }} />
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      testimonial: 'Great service and quality products!',
      rating: 5,
      avatar: ''
    },
    {
      id: 2,
      name: 'Jane Smith',
      testimonial: 'Found exactly what I needed at a great price.',
      rating: 4.5,
      avatar: ''
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 0, flexGrow: 1 }}>
        <HeroText>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
          >
            Your One-Stop Shop for Quality Electronics
          </Typography>
          <Typography
            variant="h5"
            component="p"
          >
            Discover the best deals on refurbished and new electronics
          </Typography>
        </HeroText>

        {/* Hero Section */}
        <HeroSection>
          <HeroOverlay />
        </HeroSection>

        {/* Featured Categories */}
        <Box sx={{ my: 4, flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Featured Categories
          </Typography>
          <Grid container spacing={3}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={3} key={category.id}>
                <CategoryCard>
                  <Box sx={{ 
                    width: 64, 
                    height: 64, 
                    mb: 2, 
                    borderRadius: '50%',
                    backgroundColor: category.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {category.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {category.title}
                  </Typography>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    onClick={() => navigate(`/products?category=${category.title.toLowerCase()}`)}
                  >
                    Browse {category.title}
                  </Button>
                </CategoryCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Products */}
        <Box sx={{ my: 4, flexGrow: 1 }}>
          <Typography variant="h4" gutterBottom>
            Featured Products
          </Typography>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.images[0]}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      {formatPrice(product.price)}
                    </Typography>
                    <Rating value={product.rating} readOnly precision={0.5} />
                    <Typography variant="body2" color="text.secondary">
                      <strong>Brand:</strong> {product.brand}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Model:</strong> {product.model}
                    </Typography>
                    <Button
                      variant="contained"
                      fullWidth
                      sx={{ mt: 2 }}
                      onClick={() => navigate(`/product/${product.id}`, { state: product })}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Call to Action */}
        <Box sx={{ my: 4, flexGrow: 1 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              textAlign: 'center',
              bgcolor: '#f5f5f5',
              borderRadius: 2,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
              }
            }}
          >
            <Typography variant="h4" component="h2" gutterBottom>
              Get in Touch
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Subscribe to our newsletter and stay updated with our latest offers and promotions.
            </Typography>

            {emailSent ? (
              <Alert severity="success" sx={{ mb: 2 }}>
                Thank you for subscribing!
              </Alert>
            ) : emailError ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {emailError}
              </Alert>
            ) : null}

            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Enter your email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<EmailIcon />}
                onClick={handleEmailSubmit}
                disabled={!email || emailError}
              >
                Subscribe
              </Button>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Button
                variant="outlined"
                size="large"
                startIcon={<FeedbackIcon />}
                onClick={handleFeedbackClick}
              >
                Send Feedback
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
