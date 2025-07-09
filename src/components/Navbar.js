import React, { useState } from 'react';
import {
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  IconButton,
  InputBase,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  useTheme,
  Popover,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  styled,
  CardMedia,
  Rating,
  Chip,
  Avatar,
  ListItemAvatar,
  ListItemIcon
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  ShoppingCartOutlined as ShoppingCartOutlinedIcon,
  PersonOutline as PersonOutlineIcon,
  SearchOutlined as SearchOutlinedIcon,
  Remove as RemoveIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  ShoppingCartCheckout as ShoppingCartCheckoutIcon,
  ExitToApp as LogoutIcon,
  Login as LoginIcon,
  Person as UserIcon,
  Dashboard as DashboardIcon,
  Receipt as ReceiptIcon,
  Favorite as FavoriteIcon,
  Settings as SettingsIcon
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/UserContext';
import TextField from '@mui/material/TextField';

const UserSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  '& .user-button': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },
  '& .user-menu': {
    '& .MuiPaper-root': {
      minWidth: 250,
      borderRadius: theme.shape.borderRadius,
      boxShadow: theme.shadows[8],
    },
    '& .MuiListItem-root': {
      padding: theme.spacing(1.5),
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  },
}));

const UserMenu = ({ user, isLoggedIn, logout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    {
      text: 'My Profile',
      icon: <UserIcon />,
      path: '/profile'
    },
    {
      text: 'My Orders',
      icon: <ReceiptIcon />,
      path: '/orders'
    },
    {
      text: 'Wishlist',
      icon: <FavoriteIcon />,
      path: '/wishlist'
    },
    {
      text: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings'
    }
  ];

  return (
    <UserSection>
      <Button
        className="user-button"
        color="inherit"
        onClick={handleClick}
        startIcon={
          isLoggedIn ? (
            <Avatar src={user?.avatar}>
              {user?.name?.[0] || 'U'}
            </Avatar>
          ) : (
            <PersonOutlineIcon />
          )
        }
        endIcon={isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
      >
        {isLoggedIn ? user?.name || 'Profile' : 'Login'}
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        className="user-menu"
      >
        <List>
          {isLoggedIn ? (
            menuItems.map((item) => (
              <ListItem
                key={item.text}
                button
                component={RouterLink}
                to={item.path}
                onClick={handleClose}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))
          ) : (
            <>
              <ListItem button component={RouterLink} to="/login" onClick={handleClose}>
                <ListItemIcon><LoginIcon /></ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button component={RouterLink} to="/register" onClick={handleClose}>
                <ListItemIcon><UserIcon /></ListItemIcon>
                <ListItemText primary="Register" />
              </ListItem>
            </>
          )}
          <Divider />
          {isLoggedIn && (
            <ListItem button onClick={logout}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          )}
        </List>
      </Popover>
    </UserSection>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [searchAnchor, setSearchAnchor] = React.useState(null);
  const [cartAnchor, setCartAnchor] = React.useState(null);
  const [userAnchor, setUserAnchor] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);
  const [registerDialogOpen, setRegisterDialogOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [registerData, setRegisterData] = React.useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      pincode: ''
    }
  });
  const { cartItems, clearCart, updateQuantity, removeFromCart, totalPrice } = useCart();
  const { user, isLoggedIn, login, logout, register } = useAuth();

  const handleScroll = () => {
    setIsScrolled(window.pageYOffset > 0);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleSearchClick = (event) => {
    setSearchAnchor(event.currentTarget);
  };

  const handleSearchClose = () => {
    setSearchAnchor(null);
  };

  const handleCartClick = (event) => {
    setCartAnchor(event.currentTarget);
  };

  const handleCartClose = () => {
    setCartAnchor(null);
  };

  const handleUserClick = (event) => {
    setUserAnchor(event.currentTarget);
  };

  const handleUserClose = () => {
    setUserAnchor(null);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${searchTerm}`);
    handleSearchClose();
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      await login(email, password);
      setLoginDialogOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      // Validate form data
      const errors = [];
      
      if (!registerData.name.trim()) {
        errors.push('Name is required');
      }
      if (!registerData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
        errors.push('Valid email is required');
      }
      if (registerData.password.length < 6) {
        errors.push('Password must be at least 6 characters');
      }
      if (!registerData.phone.trim()) {
        errors.push('Phone number is required');
      }
      if (!registerData.address.street.trim()) {
        errors.push('Street address is required');
      }
      if (!registerData.address.city.trim()) {
        errors.push('City is required');
      }
      if (!registerData.address.state.trim()) {
        errors.push('State is required');
      }
      if (!registerData.address.pincode.trim()) {
        errors.push('Pincode is required');
      }

      if (errors.length > 0) {
        throw new Error(errors.join('\n'));
      }

      await register(registerData);
      setRegisterDialogOpen(false);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    handleUserClose();
  };

  const menuItems = [
    { text: 'Laptops', path: '/products/laptops' },
    { text: 'Desktops', path: '/products/desktops' },
    { text: 'Accessories', path: '/products/accessories' },
    { text: 'Gadgets', path: '/products/gadgets' },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          height: '64px',
          width: '100%',
          boxShadow: isScrolled ? '10px 10px 30px rgba(0, 0, 0, 0.3)' : 'none',
          backgroundColor: isScrolled 
            ? theme.palette.primary.dark 
            : 'rgba(26, 32, 44, 0.9)',
          backdropFilter: isScrolled ? 'blur(10px)' : 'blur(5px)',
          transition: theme.transitions.create(['box-shadow', 'background-color', 'backdrop-filter'], {
            duration: theme.transitions.duration.shorter,
          }),
          color: 'white',
        }}
      >
        <Toolbar sx={{ height: '100%' }}>
          <Grid container alignItems="center" justifyContent="space-between" sx={{ height: '100%' }}>
            <Grid item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ display: { sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                variant="h6"
                component={RouterLink}
                to="/"
                sx={{
                  flexGrow: 1,
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight: 700,
                  display: { xs: 'none', sm: 'block' },
                  ml: 2
                }}
              >
                UNITECH COMPUTERS
              </Typography>
            </Grid>

            <Grid item>
              {/* Desktop menu */}
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, height: '100%' }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      mx: 1,
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      color: 'white',
                      '&:hover': {
                        color: '#2196f3',
                        textDecoration: 'none'
                      }
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>

              {/* Mobile menu */}
              <Box sx={{ display: { xs: 'flex', sm: 'none' }, height: '100%' }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ ml: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Grid>

            <Grid item>
              <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <IconButton 
                  color="inherit" 
                  sx={{ 
                    mr: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                  onClick={handleSearchClick}
                >
                  {searchAnchor ? <SearchIcon /> : <SearchOutlinedIcon />}
                </IconButton>
                
                <IconButton 
                  color="inherit" 
                  sx={{ 
                    mr: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                  onClick={handleCartClick}
                >
                  <Badge badgeContent={cartItems.length} color="secondary">
                    {cartAnchor ? <ShoppingCartIcon /> : <ShoppingCartOutlinedIcon />}
                  </Badge>
                </IconButton>

                <UserMenu user={user} isLoggedIn={isLoggedIn} logout={logout} />
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      {/* Mobile menu drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: 240,
            backgroundColor: theme.palette.primary.dark,
            color: 'white'
          },
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem button component={RouterLink} to={item.path} key={item.text}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem button component={RouterLink} to="/blog">
            <ListItemText primary="Tech Blog" />
          </ListItem>
          <ListItem button component={RouterLink} to="/contact">
            <ListItemText primary="Contact Us" />
          </ListItem>
        </List>
      </Drawer>

      {/* Login Dialog */}
      <Dialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLoginDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleLogin} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Register Dialog */}
      <Dialog open={registerDialogOpen} onClose={() => setRegisterDialogOpen(false)}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              autoFocus
              margin="dense"
              label="Full Name"
              fullWidth
              value={registerData.name}
              onChange={(e) => setRegisterData(prev => ({ ...prev, name: e.target.value }))}
              error={!registerData.name.trim()}
              helperText={!registerData.name.trim() ? 'Name is required' : ''}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              value={registerData.email}
              onChange={(e) => setRegisterData(prev => ({ ...prev, email: e.target.value }))}
              sx={{ mt: 2 }}
              error={!registerData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)}
              helperText={!registerData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email) ? 'Valid email is required' : ''}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              value={registerData.password}
              onChange={(e) => setRegisterData(prev => ({ ...prev, password: e.target.value }))}
              sx={{ mt: 2 }}
              error={registerData.password.length < 6}
              helperText={registerData.password.length < 6 ? 'Password must be at least 6 characters' : ''}
            />
            <TextField
              margin="dense"
              label="Phone Number"
              fullWidth
              value={registerData.phone}
              onChange={(e) => setRegisterData(prev => ({ ...prev, phone: e.target.value }))}
              sx={{ mt: 2 }}
              error={!registerData.phone.trim()}
              helperText={!registerData.phone.trim() ? 'Phone number is required' : ''}
            />
            <TextField
              margin="dense"
              label="Street"
              fullWidth
              value={registerData.address.street}
              onChange={(e) => setRegisterData(prev => ({ ...prev, address: { ...prev.address, street: e.target.value } }))}
              sx={{ mt: 2 }}
              error={!registerData.address.street.trim()}
              helperText={!registerData.address.street.trim() ? 'Street address is required' : ''}
            />
            <TextField
              margin="dense"
              label="City"
              fullWidth
              value={registerData.address.city}
              onChange={(e) => setRegisterData(prev => ({ ...prev, address: { ...prev.address, city: e.target.value } }))}
              sx={{ mt: 2 }}
              error={!registerData.address.city.trim()}
              helperText={!registerData.address.city.trim() ? 'City is required' : ''}
            />
            <TextField
              margin="dense"
              label="State"
              fullWidth
              value={registerData.address.state}
              onChange={(e) => setRegisterData(prev => ({ ...prev, address: { ...prev.address, state: e.target.value } }))}
              sx={{ mt: 2 }}
              error={!registerData.address.state.trim()}
              helperText={!registerData.address.state.trim() ? 'State is required' : ''}
            />
            <TextField
              margin="dense"
              label="Pincode"
              fullWidth
              value={registerData.address.pincode}
              onChange={(e) => setRegisterData(prev => ({ ...prev, address: { ...prev.address, pincode: e.target.value } }))}
              sx={{ mt: 2 }}
              error={!registerData.address.pincode.trim()}
              helperText={!registerData.address.pincode.trim() ? 'Pincode is required' : ''}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRegisterDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleRegister} disabled={loading} variant="contained" color="primary">
            {loading ? <CircularProgress size={24} /> : 'Register'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Search Popover */}
      <Popover
        open={Boolean(searchAnchor)}
        anchorEl={searchAnchor}
        onClose={handleSearchClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            p: 2,
            width: 400,
            backgroundColor: 'background.paper',
          },
        }}
      >
        <form onSubmit={handleSearchSubmit}>
          <TextField
            fullWidth
            label="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1 }} />,
            }}
          />
        </form>
      </Popover>

      {/* Cart Popover */}
      <Popover
        open={Boolean(cartAnchor)}
        anchorEl={cartAnchor}
        onClose={handleCartClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            p: 2,
            width: 350,
            backgroundColor: 'background.paper',
          },
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Shopping Cart</Typography>
            <IconButton 
              color="error" 
              onClick={() => {
                clearCart();
                handleCartClose();
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>

          {cartItems.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <ShoppingCartOutlinedIcon sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" color="text.secondary">
                Your cart is empty
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add items to your cart to get started
              </Typography>
            </Box>
          ) : (
            <List>
              {cartItems.map((item) => (
                <ListItem 
                  key={item.id}
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider'
                  }}
                >
                  <ListItemText 
                    primary={item.name} 
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                          ₹{item.price.toLocaleString()}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                          <IconButton 
                            size="small" 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            disabled={item.quantity === 1}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography variant="body2" sx={{ mx: 1, minWidth: 24, textAlign: 'center' }}>
                            {item.quantity}
                          </Typography>
                          <IconButton 
                            size="small" 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    }
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="body2" sx={{ mr: 2 }}>
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </Typography>
                    <IconButton 
                      color="error" 
                      onClick={() => removeFromCart(item.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
          )}

          <Box sx={{ mt: 2, borderTop: '1px solid', borderColor: 'divider', pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary">
                ₹{totalPrice.toLocaleString()}
              </Typography>
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<ShoppingCartCheckoutIcon />}
              component={RouterLink}
              to="/checkout"
              sx={{ mb: 1 }}
            >
              Proceed to Checkout
            </Button>
            <Button
              fullWidth
              variant="outlined"
              component={RouterLink}
              to="/cart"
            >
              View Cart Details
            </Button>
          </Box>
        </Box>
      </Popover>

      {/* User Popover */}
      <Popover
        open={Boolean(userAnchor)}
        anchorEl={userAnchor}
        onClose={handleUserClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          sx: {
            p: 2,
            width: 200,
            backgroundColor: 'background.paper',
          },
        }}
      >
        <List>
          {isLoggedIn ? (
            <>
              <ListItem>
                <ListItemText
                  primary={user?.name || 'User'}
                  secondary={user?.email}
                />
              </ListItem>
              <Divider />
              <ListItem button component={RouterLink} to="/profile" onClick={handleUserClose}>
                <ListItemText primary="My Profile" />
              </ListItem>
              <ListItem button component={RouterLink} to="/orders" onClick={handleUserClose}>
                <ListItemText primary="My Orders" />
              </ListItem>
              <ListItem button component={RouterLink} to="/wishlist" onClick={handleUserClose}>
                <ListItemText primary="Wishlist" />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem button onClick={() => {
                setLoginDialogOpen(true);
                handleUserClose();
              }}>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button onClick={() => {
                setRegisterDialogOpen(true);
                handleUserClose();
              }}>
                <ListItemText primary="Register" />
              </ListItem>
            </>
          )}
        </List>
      </Popover>
    </>
  );
};

export default Navbar;
