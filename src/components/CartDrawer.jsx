import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../store/cartSlice';
import './CartDrawer.css';

const CartDrawer = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = useSelector(state => state.cart.totalItems);
  const subtotal = useSelector(state => state.cart.subtotal);
  const discountAmount = useSelector(state => state.cart.discountAmount);
  const shippingFee = useSelector(state => state.cart.shippingFee);
  const isFreeShipping = useSelector(state => state.cart.isFreeShipping);
  const total = useSelector(state => state.cart.total);

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}></div>
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart ({totalItems})</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">₹{item.price.toLocaleString('en-IN')}</p>
                  <div className="quantity-controls">
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                  </div>
                  <button className="remove-item" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-summary">
            {totalItems > 2 && (
              <div className="discount-notice">
                10% Discount Applied! (&gt;2 items)
              </div>
            )}
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {discountAmount > 0 && (
              <div className="summary-row discount">
                <span>Discount (10%)</span>
                <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="summary-row shipping">
              <span>Shipping</span>
              {isFreeShipping ? (
                <span>
                  <span className="crossed-out">₹199</span>
                  <span className="free-text"> Free</span>
                </span>
              ) : (
                <span>₹{shippingFee.toLocaleString('en-IN')}</span>
              )}
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <button className="btn-primary checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
