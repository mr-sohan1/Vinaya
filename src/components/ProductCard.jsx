import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [hasError, setHasError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (hasError) return null;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="product-card fade-in">
      <div className="product-image-wrapper">
        <img 
          src={product.image} 
          alt={product.name} 
          onError={() => setHasError(true)}
        />
        <div className="product-overlay">
          <button className={`btn-primary add-to-cart ${isAdded ? 'added' : ''}`} onClick={handleAddToCart}>
            {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
      </div>
    </div>
  );
};

export default ProductCard;
