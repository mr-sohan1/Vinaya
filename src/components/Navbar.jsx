import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Navbar.css';

const Navbar = ({ onOpenCart }) => {
  const totalItems = useSelector((state) => state.cart.totalItems);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
      <div className="container nav-container">
        <div className="nav-logo">
          <a href="/" className="logo-text">
            <span className="logo-v">V</span>
            <span className="logo-rest">INAYA</span>
          </a>
        </div>
        <nav className="nav-links">
          <a href="#fragrances" onClick={(e) => scrollToSection(e, 'fragrances')}>Fragrances</a>
          <a href="#about" onClick={(e) => scrollToSection(e, 'footer')}>About</a>
          <a href="#contact" onClick={(e) => scrollToSection(e, 'footer')}>Contact</a>
        </nav>
        <div className="nav-actions">
          <button className="login-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="login-text">Login</span>
          </button>
          
          <button className="cart-btn" onClick={onOpenCart}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
