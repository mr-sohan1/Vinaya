import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer" className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <h2>VINAYA</h2>
          <p>The essence of luxury.</p>
        </div>
        <div className="footer-links">
          <div className="link-col">
            <h4>Shop</h4>
            <a href="#">Men</a>
            <a href="#">Women</a>
            <a href="#">Unisex</a>
          </div>
          <div className="link-col">
            <h4>Company</h4>
            <a href="#">About Us</a>
            <a href="#">Contact</a>
            <a href="#">Careers</a>
          </div>
        </div>
        <div className="footer-newsletter">
          <h4>Stay Updated</h4>
          <div className="newsletter-input">
            <input type="email" placeholder="Enter your email" />
            <button className="btn-accent">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Vinaya. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
