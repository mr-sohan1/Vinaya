import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import ProductCard from './ProductCard';
import { PRODUCTS } from '../data/products';
import './ProductGrid.css';

const CATEGORIES = ['All', 'Men', 'Women', 'Unisex'];
const SORT_OPTIONS = [
  { value: 'default', label: 'Sort By' },
  { value: 'low-to-high', label: 'Price: Low to High' },
  { value: 'high-to-low', label: 'Price: High to Low' },
];

const ProductGrid = () => {
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('default');
  const [isSortOpen, setIsSortOpen] = useState(false);
  // Lazy Loading state
  const [visibleCount, setVisibleCount] = useState(9);

  // Shuffle products dynamically on every page load
  const [shuffledProducts] = useState(() => {
    const newArray = [...PRODUCTS];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  });

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...shuffledProducts];

    if (filter !== 'All') {
      result = result.filter(p => p.category === filter);
    }

    if (sort === 'low-to-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === 'high-to-low') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [filter, sort]);

  // Reset lazy load count when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [filter, sort]);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef();

  const visibleProducts = filteredAndSortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedProducts.length;

  const lastProductElementRef = useCallback(node => {
    if (isLoadingMore) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setIsLoadingMore(true);
        // Add a 800ms delay to show the loading animation gracefully
        setTimeout(() => {
          setVisibleCount(prev => prev + 9);
          setIsLoadingMore(false);
        }, 800);
      }
    }, { rootMargin: '100px' });
    
    if (node) observer.current.observe(node);
  }, [isLoadingMore, hasMore]);

  const handleSortSelect = (val) => {
    setSort(val);
    setIsSortOpen(false);
  };

  return (
    <section id="fragrances" className="product-grid-section container">
      <div className="grid-header">
        <h2>Our Collection</h2>
        
        <div className="premium-controls">
          {/* Category Pills */}
          <div className="category-pills">
            {CATEGORIES.map(cat => (
              <button 
                key={cat} 
                className={`category-pill ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Custom Sort Dropdown */}
          <div className="custom-sort-dropdown">
            <button 
              className="sort-trigger glass" 
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              {SORT_OPTIONS.find(opt => opt.value === sort).label}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`chevron ${isSortOpen ? 'open' : ''}`}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
            {isSortOpen && (
              <div className="sort-menu glass fade-in">
                {SORT_OPTIONS.map(opt => (
                  <button 
                    key={opt.value} 
                    className={`sort-option ${sort === opt.value ? 'active' : ''}`}
                    onClick={() => handleSortSelect(opt.value)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* We use key={filter + sort} to force the entire grid to re-mount and replay the premium fade-in animation whenever the category changes */}
      <div className="product-grid" key={filter + sort}>
        {visibleProducts.map((product, index) => {
          if (visibleProducts.length === index + 1) {
            return (
              <div ref={lastProductElementRef} key={product.id}>
                <ProductCard product={product} />
              </div>
            );
          } else {
            return <ProductCard key={product.id} product={product} />;
          }
        })}
      </div>
      
      {isLoadingMore && (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
