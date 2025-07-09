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
  Alert,
  InputAdornment,
  styled,
  useTheme,
  useMediaQuery,
  SwipeableDrawer,
  Slider,
  Pagination,
  Avatar
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
  Computer,
  Search,
  CheckCircle,
  LocalShipping,
  ThumbUp,
  FiberManualRecord,
  KeyboardArrowLeft,
  KeyboardArrowRight
} from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { formatPrice } from '../utils/currency';
import theme from '../theme/theme';

const CategoryCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(3),
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
  },
  cursor: 'pointer',
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
  },
}));

const HeroSection = styled(Box)({
  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%)',
  padding: '80px 0',
  borderRadius: '20px',
  marginBottom: '40px',
});

const TestimonialCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  transition: 'transform 0.3s ease',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
}));

const TestimonialSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
}));

const GradientText = styled(Typography)({
  background: 'linear-gradient(45deg, #2563eb, #10b981)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
});

const Home = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const categories = [
    { 
      icon: LaptopMac, 
      label: 'Laptops',
      path: '/products/laptops'
    },
    { 
      icon: DesktopWindows, 
      label: 'Desktops',
      path: '/products/desktops'
    },
    { 
      icon: Computer, 
      label: 'Accessories',
      path: '/products/accessories'
    }
  ];

  const features = [
    { icon: CheckCircle, label: 'Free Shipping', color: '#10b981' },
    { icon: LocalShipping, label: '24/7 Support', color: '#2563eb' },
  ];

  const testimonials = [
    {
      name: 'John Smith',
      role: 'Software Developer',
      rating: 5,
      content: "I've been shopping at Unitech for years and their customer service is top-notch. They always have the latest technology at great prices.",
      image: '/images/testimonial1.jpg'
    },
    {
      name: 'Sarah Johnson',
      role: 'Graphic Designer',
      rating: 5,
      content: "The quality of products at Unitech is exceptional. I've never had any issues with my purchases and their delivery is always on time.",
      image: '/images/testimonial2.jpg'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <HeroSection>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <GradientText variant="h1" gutterBottom>
                Welcome to Unitech Computers
              </GradientText>
              <Typography variant="h2" color="text.secondary" paragraph>
                Discover the latest in technology
              </Typography>
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: '400px',
                  background: 'linear-gradient(45deg, #2563eb, #10b981)',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.9,
                }}
              >
                <Typography variant="h2" color="white">
                  Explore Now
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </HeroSection>

      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Typography variant="h2" gutterBottom>
          Shop by Category
        </Typography>
        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <RouterLink to={category.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CategoryCard>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <category.icon sx={{ fontSize: 60 }} />
                  </Box>
                  <Typography variant="h5" align="center">
                    {category.label}
                  </Typography>
                </CategoryCard>
              </RouterLink>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ mt: 8, mb: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom sx={{ textAlign: 'center' }}>
            Why Choose Us
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <FeatureCard>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ color: feature.color }}>
                      <feature.icon sx={{ fontSize: '24px' }} />
                    </Box>
                    <Typography variant="h6" color="text.primary">
                      {feature.label}
                    </Typography>
                  </Box>
                </FeatureCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <TestimonialSection>
        <Container maxWidth="lg">
          <Typography variant="h2" gutterBottom sx={{ textAlign: 'center', mb: 6 }}>
            What Our Customers Say
          </Typography>
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <TestimonialCard>
                  <Box sx={{ width: '100%', textAlign: 'center' }}>
                    <Avatar src={testimonial.image} sx={{ width: 80, height: 80, mb: 2 }} />
                    <Typography variant="h6" color="primary" sx={{ mb: 1 }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      {testimonial.role}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 3 }}>
                      "{testimonial.content}"
                    </Typography>
                    <Rating
                      value={testimonial.rating}
                      precision={0.5}
                      readOnly
                      size="medium"
                      sx={{ color: '#ffd700' }}
                    />
                  </Box>
                </TestimonialCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </TestimonialSection>
    </Box>
  );
};

export default Home;
