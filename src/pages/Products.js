import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box,
  Card,
  CardContent,
  Button,
  Rating,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Tabs,
  Tab,
  Paper,
  CardMedia,
  Skeleton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  styled,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LaptopMac from '@mui/icons-material/LaptopMac';
import DesktopWindows from '@mui/icons-material/DesktopWindows';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[8]
  },
  borderRadius: '12px',
  overflow: 'hidden'
}));

const StyledCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(2),
  flex: 1,
  display: 'flex',
  flexDirection: 'column'
}));

const StyledButtonGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  borderTop: `1px solid ${theme.palette.divider}`
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    boxShadow: theme.shadows[24]
  }
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(3),
  borderBottom: `1px solid ${theme.palette.divider}`
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(4)
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: theme.spacing(3)
}));

const StyledSpecsList = styled(List)(({ theme }) => ({
  '& .MuiListItem-root': {
    padding: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  '& .MuiListItemText-root': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2)
  }
}));

const StyledProductImage = styled(CardMedia)(({ theme }) => ({
  height: '200px',
  borderRadius: '12px',
  objectFit: 'cover',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)'
  }
}));

const Products = () => {
  const { category } = useParams();
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const { cartItems, addToCart } = useCart();
  const theme = useTheme();

  // Initialize products data
  const laptopCategories = [
    {
      id: 1,
      title: 'MacBook',
      description: 'Thin, light, and powerful - perfect for professionals',
      icon: <LaptopMac sx={{ fontSize: 40 }} />,
      products: [
        {
          id: 1,
          name: "Apple MacBook Air M4 14inch",
          brand: "Apple",
          model: "M4 Air",
          description: "14-inch Retina display, M4 chip, 16GB RAM, 256GB SSD",
          price: 82000,
          category: "laptops",
          condition: "new",
          image: '/images/Apple m4 air.jpeg',
          rating: 4.7,
          specs: {
            processor: "Apple M4",
            ram: "16GB Unified Memory",
            storage: "256GB SSD",
            display: "14-inch Retina display",
            graphics: "Apple M4 graphics",
            battery: "Up to 18 hours",
            weight: "2.8 pounds",
            color: "Space Gray"
          }
        },
        {
          id: 2,
          name: "Apple MacBook pro A1989 with Touch Bar",
          brand: "Apple",
          model: "A1989",
          description: "16-inch Retina display, Intel Core i5, 8GB RAM, 256GB SSD",
          price: 21500,
          category: "laptops",
          condition: "new",
          image: '/images/A1989.jpg',
          rating: 4.8,
          specs: {
            processor: "Intel Core i5",
            ram: "8GB RAM",
            storage: "256GB SSD",
            display: "16-inch Retina display",
            graphics: "Integrated Intel Graphics",
            battery: "Up to 14 hours",
            weight: "3.2 pounds",
            color: "Black"
          }
        },
        {
          id: 3,
          name: "Apple MacBook pro M1 (2021)",
          brand: "Apple",
          model: "M1 Pro",
          description: "16-inch Retina display, M1 chip, 32GB RAM, 512GB SSD",
          price: 84000,
          category: "laptops",
          condition: "new",
          image: '/images/m1 pro 16inch.jpg',
          rating: 4.8,
          specs: {
            processor: "Apple M1",
            ram: "32GB RAM",
            storage: "512GB SSD",
            display: "16-inch Retina display",
            graphics: "Apple M1 graphics",
            battery: "Up to 21 hours",
            weight: "3.5 pounds",
            color: "Silver"
          }
        },
        {
          id: 4,
          name: "Apple MacBook M3 Pro",
          brand: "Apple",
          model: "M3 Pro",
          description: "16-inch Retina display, M3 chip, 18GB RAM, 512GB SSD",
          price: 84000,
          category: "laptops",
          condition: "new",
          image: '/images/M3 pro.png',
          rating: 4.8,
          specs: {
            processor: "Apple M3",
            ram: "18GB RAM",
            storage: "512GB SSD",
            display: "16-inch Retina display",
            graphics: "Apple M3 graphics",
            battery: "Up to 21 hours",
            weight: "3.5 pounds",
            color: "Silver"
          }
        }
      ]
    },
    {
      id: 2,
      title: 'Business Laptops',
      description: 'High-performance machines for gaming and content creation',
      icon: <DesktopWindows sx={{ fontSize: 40 }} />,
      products: [
        {
          id: 4,
          name: "Dell latitude 5420",
          brand: "Dell",
          model: "5420",
          description: "15.6-inch 360Hz display, Intel Core i7, 11th gen, 16GB RAM, 512GB SSD, with Touchpad",
          price: 21500,
          category: "laptops",
          condition: "new",
          image: '/images/Dell 5420.jpg',
          rating: 4.9,
          specs: {
            processor: "Intel Core i7",
            ram: "16GB RAM",
            storage: "512GB SSD",
            display: "15.6-inch 360Hz display",
            graphics: "Integrated Intel Graphics",
            battery: "Up to 8 hours",
            weight: "4.3 pounds",
            color: "Obsidian Black"
          }
        },
        {
          id: 5,
          name: "Lenovo L460",
          brand: "Lenovo",
          model: "L460",
          description: "15.6-inch 360Hz display, Intel Core i5, 6th gen, 8GB RAM, 512GB SSD",
          price: 11500,
          category: "laptops",
          condition: "new",
          image: '/images/Lenovo L460.jpg',
          rating: 4.9,
          specs: {
            processor: "Intel Core i7",
            ram: "16GB RAM",
            storage: "512GB SSD",
            display: "15.6-inch 360Hz display",
            graphics: "Integrated Intel Graphics",
            battery: "Up to 8 hours",
            weight: "4.3 pounds",
            color: "Obsidian Black"
          }
        },
        {
          id: 6,
          name: "Lenovo X1 Yoga",
          brand: "Lenovo",
          model: "X1 Yoga",
          description: "14-inch 360Hz display, Intel Core i7, 8th gen, 16GB RAM, 256GB NVMe SSD",
          price: 20000,
          category: "laptops",
          condition: "new",
          image: '/images/X1 yoga.jpg',
          rating: 4.9,
          specs: {
            processor: "Intel Core i7",
            ram: "16GB RAM",
            storage: "256GB NVMe SSD",
            display: "15.6-inch 360Hz display",
            graphics: "Integrated Intel Graphics",
            battery: "Up to 8 hours",
            weight: "4.3 pounds",
            color: "Obsidian Black"
          }
        },
        {
          id: 7,
          name: "Lenovo X1 Carbon",
          brand: "Lenovo",
          model: "X1 Carbon",
          description: "14-inch 360Hz display, Intel Core i7, 8th gen, 16GB RAM, 256GB NVMe SSD",
          price: 22500,
          category: "laptops",
          condition: "new",
          image: '/images/X1 carbon.jpg',
          rating: 4.9,
          specs: {
            processor: "Intel Core i7",
            ram: "16GB RAM",
            storage: "256GB NVMe SSD",
            display: "14-inch 360Hz display",
            graphics: "Integrated Intel Graphics",
            battery: "Up to 8 hours",
            weight: "4.3 pounds",
            color: "Obsidian Black"
          }
        },
        {
          id: 8,
          name: "Dell Latitude 3420",
          brand: "Dell",
          model: "Latitude 3420",
          description: "14-inch 360Hz display, Intel Core i5, 11th gen, 8GB RAM, 256GB SSD",
          price: 18000,
          category: "laptops",
          condition: "new",
          image: '/images/Dell 3420.jpg',
          rating: 4.9,
          specs: {
            processor: "Intel Core i5",
            ram: "8GB RAM",
            storage: "256GB SSD",
            display: "14-inch 360Hz display",
            graphics: "Integrated Intel Graphics",
            battery: "Up to 8 hours",
            weight: "4.3 pounds",
            color: "Obsidian Black"
          }
        },
        {
          id: 9,
          name: "HP EliteBook 440 G8",
          brand: "HP",
          model: "EliteBook 440 G8",
          description: "14-inch 360Hz display, Intel Core i5, 11th gen, 8GB RAM, 256GB NVMe SSD",
          price: 18000,
          category: "laptops",
          condition: "new",
          image: '/images/HP 440 G8.jpg',
          rating: 4.9,
          specs: {
            processor: "Intel Core i5",
            ram: "8GB RAM",
            storage: "256GB NVMe SSD",
            display: "14-inch 360Hz display",
            graphics: "Integrated Intel Graphics",
            battery: "Up to 8 hours",
            weight: "4.3 pounds",
            color: "Obsidian Black"
          }
        },
        {
          id: 10,
          name: "HP Pavilion 15",
          brand: "HP",
          model: "Pavilion 15",
          description: "15.6-inch 360Hz display, Intel Core i5, 7th gen, 16GB RAM, 512GB SSD, Backlit Keyboard",
          price: 22500,
          category: "laptops",
          condition: "new",
          image: '/images/Pavilion i5.jpg',
          rating: 4.9,
          specs: {
            processor: "Intel Core i5",
            ram: "16GB RAM",
            storage: "512GB SSD",
            display: "15.6-inch 360Hz display",
            graphics: "4GB NVIDIA Graphics",
            battery: "Up to 8 hours",
            weight: "4.3 pounds",
            color: "Obsidian Black"
          }
        },
        {
          id: 11,
          name: "HP Pavilion gaming 15",
          brand: "HP",
          model: "Pavilion 15",
          description: "15.6-inch 360Hz display, AMD Ryzen 5 4600H, 7th gen, 16GB RAM, 512GB SSD, Backlit Keyboard",
          price: 24500,
          category: "laptops",
          condition: "new",
          image: '/images/HP amd 5.jpg',
          rating: 4.9,
          specs: {
            processor: "AMD Ryzen 5",
            ram: "16GB RAM",
            storage: "512GB SSD",
            display: "15.6-inch 360Hz display",
            graphics: "4GB NVIDIA Graphics",
            battery: "Up to 8 hours",
            weight: "4.3 pounds",
            color: "Obsidian Black"
          }
        },
        {
          id: 12,
          name: "Dell Latitude 5410",
          brand: "Dell",
          model: "Latitude 5410",
          description: "14-inch FHD display, Intel Core i7, 10th gen, 8GB RAM, 256GB SSD, Backlit Keyboard",
          price: 24500,
          category: "laptops",
          condition: "new",
          image: '/images/Dell 5410.jpg',
          rating: 4.9,
          specs: {
            processor: "Intel Core i7",
            ram: "8GB RAM",
            storage: "256GB SSD",
            display: "14-inch FHD display",
            graphics: "Integrated Intel Graphics",
            battery: "Up to 8 hours",
            weight: "4.3 pounds",
            color: "Obsidian Black"
          }
        },
        {
          id: 13,
          name: "Dell Latitude 7490",
          brand: "Dell",
          model: "Latitude 7490",
          description: "14-inch FHD display, Intel Core i7, 8th gen, 8GB RAM, 256GB SSD, Backlit Keyboard",
          price: 24500,
          category: "laptops",
          condition: "new",
          image: '/images/Dell 7490.jpg',
          rating: 4.9,
          specs: {
            processor: "Intel Core i7",
            ram: "8GB RAM",
            storage: "256GB SSD",
            display: "14-inch FHD display",
            graphics: "Integrated Intel Graphics",
            battery: "Up to 8 hours",
            weight: "4.3 pounds",
            color: "Obsidian Black"
          }
        },
      ]
    }
  ];

  const desktopCategories = [
    {
      id: 3,
      title: 'Gaming Desktops',
      description: 'High-performance systems for gaming and creative work',
      icon: <DesktopWindows sx={{ fontSize: 40 }} />,
      products: [
        {
          id: 5,
          name: "Alienware Aurora",
          brand: "Dell",
          model: "Aurora",
          description: "12th Gen Intel Core i9, RTX 3080, 32GB RAM, 1TB SSD",
          price: 299999,
          category: "desktops",
          condition: "new",
          image: '/images/alienware_aurora.jpg',
          rating: 4.9,
          specs: {
            processor: "Intel Core i9",
            ram: "32GB RAM",
            storage: "1TB SSD",
            graphics: "NVIDIA RTX 3080",
            case: "Mid Tower",
            power: "850W",
            color: "Obsidian Black"
          }
        }
      ]
    }
  ];

  const handleAddToCart = (product) => {
    if (addToCart) {
      addToCart(product);
    }
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
  };

  const filteredProducts = (category) => {
    const categories = category === 'laptops' ? laptopCategories : desktopCategories;
    const currentCategory = categories[selectedTab];
    
    if (!currentCategory || !currentCategory.products || !Array.isArray(currentCategory.products)) {
      return [];
    }

    return currentCategory.products.filter(product => {
      const matchesSearch = product.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
                          product.description?.toLowerCase()?.includes(searchTerm.toLowerCase()) || false;
      const matchesCondition = selectedCondition === 'all' || 
                             product.condition === selectedCondition;
      return matchesSearch && matchesCondition;
    });
  };

  const ProductCard = ({ product }) => {
    return (
      <StyledCard>
        <StyledProductImage
          component="img"
          height="200"
          image={product.image || '/images/default-product.jpg'}
          alt={product.name}
          sx={{
            objectFit: 'contain',
            borderRadius: '8px',
            '&:hover': {
              opacity: 0.9
            }
          }}
          onError={(e) => {
            const img = e.target;
            img.src = '/images/default-product.jpg';
          }}
        />
        <StyledCardContent>
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
        </StyledCardContent>
        <StyledButtonGroup>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<ShoppingCartIcon />}
            onClick={() => handleAddToCart(product)}
            disabled={!addToCart}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                backgroundColor: 'primary.dark'
              }
            }}
          >
            Add to Cart
          </Button>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<DescriptionIcon />}
            onClick={() => handleViewDetails(product)}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderColor: 'primary.main',
              '&:hover': {
                borderColor: 'primary.dark'
              }
            }}
          >
            View Details
          </Button>
        </StyledButtonGroup>
      </StyledCard>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          {category === 'laptops' ? 'Laptops' : 'Desktops'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {category === 'laptops' ? 
            laptopCategories[selectedTab]?.description :
            desktopCategories[selectedTab]?.description
          }
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ mr: 1 }} />
                )
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Condition</InputLabel>
              <Select
                value={selectedCondition}
                label="Condition"
                onChange={(e) => setSelectedCondition(e.target.value)}
              >
                <MenuItem value="all">All Conditions</MenuItem>
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="used">Used</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={selectedTab}
          onChange={(e, newValue) => setSelectedTab(newValue)}
          textColor="primary"
          indicatorColor="primary"
        >
          {category === 'laptops' ? 
            laptopCategories.map(cat => (
              <Tab 
                key={cat.id} 
                icon={cat.icon} 
                label={cat.title} 
                iconPosition="start" 
              />
            )) :
            desktopCategories.map(cat => (
              <Tab 
                key={cat.id} 
                icon={cat.icon} 
                label={cat.title} 
                iconPosition="start" 
              />
            ))
          }
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        {filteredProducts(category).map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>

      <StyledDialog
        open={openDetails}
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
      >
        {selectedProduct && (
          <>
            <StyledDialogTitle>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <StyledProductImage
                  component="img"
                  height="200"
                  image={selectedProduct.image || '/images/default-product.jpg'}
                  alt={selectedProduct.name}
                  sx={{
                    width: '200px',
                    borderRadius: '12px',
                    objectFit: 'contain',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                  onError={(e) => {
                    const img = e.target;
                    img.src = '/images/default-product.jpg';
                  }}
                />
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {selectedProduct.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    {formatPrice(selectedProduct.price)}
                  </Typography>
                  <Rating value={selectedProduct.rating} readOnly precision={0.5} />
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Brand:</strong> {selectedProduct.brand}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Model:</strong> {selectedProduct.model}
                  </Typography>
                </Box>
              </Box>
            </StyledDialogTitle>
            <StyledDialogContent>
              <Typography variant="body1" paragraph>
                {selectedProduct.description}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                Specifications
              </Typography>
              <StyledSpecsList>
                {Object.entries(selectedProduct.specs).map(([key, value]) => (
                  <ListItem key={key}>
                    <ListItemText
                      primary={key}
                      secondary={value}
                      primaryTypographyProps={{ fontWeight: 'bold' }}
                    />
                  </ListItem>
                ))}
              </StyledSpecsList>
            </StyledDialogContent>
            <StyledDialogActions>
              <Button onClick={handleCloseDetails}>
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<ShoppingCartIcon />}
                onClick={() => {
                  handleAddToCart(selectedProduct);
                  handleCloseDetails();
                }}
                disabled={!addToCart}
                sx={{
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: 'primary.dark'
                  }
                }}
              >
                Add to Cart
              </Button>
            </StyledDialogActions>
          </>
        )}
      </StyledDialog>
    </Container>
  );
};

export default Products;
