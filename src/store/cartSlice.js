import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalItems: 0,
  subtotal: 0,
  discountAmount: 0,
  shippingFee: 199,
  isFreeShipping: true,
  total: 0
};

const calculateTotals = (state) => {
  state.totalItems = state.items.reduce((acc, item) => acc + item.quantity, 0);
  state.subtotal = state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  state.discountAmount = state.totalItems > 2 ? state.subtotal * 0.1 : 0;
  state.total = state.subtotal - state.discountAmount + (state.isFreeShipping ? 0 : state.shippingFee);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      calculateTotals(state);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      calculateTotals(state);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        const existing = state.items.find(item => item.id === id);
        if (existing) {
          existing.quantity = quantity;
        }
      }
      calculateTotals(state);
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
