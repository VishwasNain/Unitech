import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Typography, 
  Box,
  Card,
  CardContent,
  Button,
  IconButton,
  TextField,
  Paper,
  Divider,
  Chip,
  Alert
} from '@mui/material';
import {
  Remove as RemoveIcon,
  Add as AddIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/currency';

const Cart = () => {
  const { cartItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [showDiscountAlert, setShowDiscountAlert] = useState(false);

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, newQuantity);
  };

  const handleCouponApply = () => {
    // In a real application, you would validate the coupon with your backend
    if (coupon === 'UNITECH20') {
      setDiscount(20);
      setShowDiscountAlert(true);
    } else {
      setDiscount(0);
      setShowDiscountAlert(true);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  const finalPrice = totalPrice - (totalPrice * (discount / 100));

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Your Shopping Cart
        </Typography>
      </Box>

      {cartItems.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h5" gutterBottom>
            Your cart is empty
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {/* Cart Items */}
          <Grid item xs={12} md={8}>
            {cartItems.map((item) => (
              <Card key={item.id} sx={{ mb: 2 }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={8}>
                      <Typography variant="h6" gutterBottom>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatPrice(item.price)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {item.quantity}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                        <IconButton
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <TextField
                          size="small"
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 1)}
                          sx={{ mx: 1, width: '60px' }}
                          inputProps={{
                            min: 1,
                            max: 10,
                            type: 'number'
                          }}
                        />
                        <IconButton
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button
                          variant="outlined"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </Button>
                        <Typography variant="h6" color="primary">
                          {formatPrice(item.price * item.quantity)}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>

          {/* Cart Summary */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: 'fit-content' }}>
              <Typography variant="h6" gutterBottom>
                Cart Summary
              </Typography>
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Subtotal:</Typography>
                <Typography variant="h6" color="primary">
                  {formatPrice(totalPrice)}
                </Typography>
              </Box>

              {showDiscountAlert && (
                <Alert severity={discount > 0 ? 'success' : 'error'} sx={{ mb: 2 }}>
                  {discount > 0 ? `Coupon applied! ${discount}% discount` : 'Invalid coupon code'}
                </Alert>
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography>Discount:</Typography>
                <Typography variant="h6" color="primary">
                  {discount > 0 ? `-${formatPrice((totalPrice * discount) / 100)}` : '₹0.00'}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6" color="primary">
                  {formatPrice(finalPrice)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={handleCheckout}
                sx={{ mt: 2 }}
              >
                Proceed to Checkout
              </Button>

              <Button
                variant="outlined"
                fullWidth
                onClick={clearCart}
                sx={{ mt: 2 }}
              >
                Clear Cart
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Cart;
