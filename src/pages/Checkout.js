import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Paper,
  Divider,
  Alert,
  CircularProgress
} from '@mui/material';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { cartItems, totalPrice } = useCart();
  const { user, login, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    // Here you would typically make an API call to process the order
    // For now, we'll just simulate the process
    setTimeout(() => {
      setLoading(false);
      // Clear cart and show success message
      navigate('/order-confirmation');
      toast.success('Order placed successfully!');
    }, 2000);
  };

  const validateForm = () => {
    if (!formData.name) {
      setError('Please enter your name');
      return false;
    }
    if (!formData.phone) {
      setError('Please enter your phone number');
      return false;
    }
    if (!formData.address) {
      setError('Please enter your address');
      return false;
    }
    if (!formData.city) {
      setError('Please enter your city');
      return false;
    }
    if (!formData.state) {
      setError('Please enter your state');
      return false;
    }
    if (!formData.pincode) {
      setError('Please enter your pincode');
      return false;
    }
    setError('');
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please add some items to your cart before proceeding to checkout.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Checkout
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Shipping Information
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Place Order'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">
              Total Items: {cartItems.length}
            </Typography>
            <Typography variant="body1">
              Total Price: ₹{totalPrice.toFixed(2)}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
