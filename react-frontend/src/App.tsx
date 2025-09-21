import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { fetchMenu } from './services/api';
import { Shop, Product } from './types';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';

// Wrapper component to handle URL parameters
const ProductDetailWrapper: React.FC<{ shop: Shop | null }> = ({ shop }) => {
  const { id } = useParams<{ id: string }>();
  const product = shop ? shop.products.find(p => p.id === parseInt(id || '0')) || null : null;
  return <ProductDetail product={product} />;
};

function App() {
  const [shop, setShop] = useState<Shop | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Set page title
    document.title = 'Bistro Parisien - Commande en ligne';
    
    const loadMenu = async () => {
      try {
        const menuData = await fetchMenu();
        setShop(menuData);
      } catch (err) {
        setError('Erreur lors du chargement du menu');
        console.error('Error loading menu:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du menu...</p>
        </div>
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Erreur</h1>
          <p className="text-gray-600">{error || 'Impossible de charger le menu'}</p>
        </div>
      </div>
    );
  }

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<ProductList products={shop.products} />} />
              <Route 
                path="/product/:id" 
                element={<ProductDetailWrapper shop={shop} />} 
              />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
