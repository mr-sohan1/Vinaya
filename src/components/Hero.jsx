import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img src="/hero_banner.png" alt="Vinaya Luxury Perfumes" />
        <div className="hero-overlay"></div>
      </div>
      <div className="hero-content container fade-in">
        <h1>Discover Your Signature Scent</h1>
        <p>A curated collection of bespoke luxury fragrances crafted for the modern individual.</p>
        <button 
          className="btn-primary" 
          onClick={() => document.getElementById('fragrances').scrollIntoView({ behavior: 'smooth' })}
        >
          Shop Collection
        </button>
      </div>
    </section>
  );
};

export default Hero;
