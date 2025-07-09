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
  InputAdornment,
  styled,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LaptopMac from '@mui/icons-material/LaptopMac';
import DesktopWindows from '@mui/icons-material/DesktopWindows';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
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
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const { cartItems, addToCart } = useCart();
  const theme = useTheme();

  // Initialize products data
  const productsByCategory = {
    laptops: [
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
        condition: "new,used",
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
      },
      {
        id: 5,
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
        id: 6,
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
        id: 7,
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
        id: 8,
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
        id: 9,
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
        id: 10,
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
        id: 11,
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
        id: 12,
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
        id: 13,
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
        id: 14,
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
      }
    ],
    desktops: [
      // Add desktop products here
    ],
    accessories: [
      // Add accessories here
    ]
  };

  // Get all products from all categories
  const allProducts = Object.values(productsByCategory).flat();

  // Get search term from URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const search = searchParams.get('search');
    if (search) {
      setSearchTerm(search);
    }
  }, [location.search]);

  // Filter products based on category
  const filteredProducts = category 
    ? productsByCategory[category] || []
    : allProducts;

  // Get search suggestions
  useEffect(() => {
    if (searchTerm.length > 1) {
      const suggestions = filteredProducts
        .filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(product => product.name)
        .slice(0, 5);
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchTerm, filteredProducts]);

  // Filter by search term
  const searchFilteredProducts = filteredProducts.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter by condition
  const conditionFilteredProducts = searchFilteredProducts.filter(product => 
    selectedCondition === 'all' || product.condition === selectedCondition
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      navigate(`/products?search=${encodeURIComponent(value)}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: theme.palette.background.default }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {category ? 
              category.charAt(0).toUpperCase() + category.slice(1) + ' Products' :
              'All Products'
            }
          </Typography>
        </Box>

        <Box sx={{ mb: 4, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchSuggestions.length > 0 && (
                <Box sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 1, backgroundColor: 'background.paper', boxShadow: 2 }}>
                  {searchSuggestions.map((suggestion, index) => (
                    <Button
                      key={index}
                      fullWidth
                      onClick={() => {
                        setSearchTerm(suggestion);
                        navigate(`/products?search=${encodeURIComponent(suggestion)}`);
                      }}
                      sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        '&:hover': {
                          backgroundColor: 'action.hover',
                        },
                      }}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </Box>
              ),
            }}
          />
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Condition</InputLabel>
            <Select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              label="Condition"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="new">New</MenuItem>
              <MenuItem value="used">Used</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          {conditionFilteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <StyledCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
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
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {product.brand} {product.model}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {formatPrice(product.price)}
                  </Typography>
                  <Rating value={product.rating} readOnly precision={0.5} />
                  <StyledButtonGroup>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => {
                        setSelectedProduct(product);
                        setOpenDetails(true);
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<ShoppingCartIcon />}
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </StyledButtonGroup>
                </StyledCardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>

        {conditionFilteredProducts.length === 0 && (
          <Typography variant="h6" color="text.secondary" align="center" sx={{ mt: 4 }}>
            No products found matching your criteria
          </Typography>
        )}
      </Container>

      <StyledDialog open={openDetails} onClose={() => setOpenDetails(false)}>
        <StyledDialogTitle>
          Product Details
          <IconButton
            onClick={() => setOpenDetails(false)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </StyledDialogTitle>
        <StyledDialogContent>
          {selectedProduct && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 4 }}>
                <Box>
                  <Typography variant="h5" gutterBottom>
                    {selectedProduct.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                    {selectedProduct.brand} {selectedProduct.model}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    {formatPrice(selectedProduct.price)}
                  </Typography>
                  <Rating value={selectedProduct.rating} readOnly precision={0.5} />
                </Box>
                <CardMedia
                  component="img"
                  height="200"
                  image={selectedProduct.image}
                  alt={selectedProduct.name}
                  sx={{
                    width: 200,
                    borderRadius: '8px',
                    objectFit: 'contain',
                    ml: 4,
                    boxShadow: 2,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    }
                  }}
                  onError={(e) => {
                    const img = e.target;
                    img.src = '/images/default-product.jpg';
                  }}
                />
              </Box>
              <Typography variant="body1" paragraph sx={{ mb: 4 }}>
                {selectedProduct.description}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Specifications
              </Typography>
              <StyledSpecsList>
                {Object.entries(selectedProduct.specs).map(([key, value]) => (
                  <ListItem key={key}>
                    <ListItemText
                      primary={key.replace(/([A-Z])/g, ' $1').trim()}
                      secondary={value}
                    />
                  </ListItem>
                ))}
              </StyledSpecsList>
            </Box>
          )}
        </StyledDialogContent>
        <StyledDialogActions>
          <Button onClick={() => setOpenDetails(false)}>Close</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              addToCart(selectedProduct);
              setOpenDetails(false);
            }}
          >
            Add to Cart
          </Button>
        </StyledDialogActions>
      </StyledDialog>
    </Box>
  );
};

export default Products;
