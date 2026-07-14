import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

function App() {
  // Demonstration of LIFTING STATE UP via Props
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="app">
      <Navbar onOpenCart={() => setIsCartOpen(true)} />
      <Hero />
      <main>
        <ProductGrid />
      </main>
      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}

export default App;
