import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import StockPage from './pages/StockPage';
//import ECommercePage from './pages/ECommercePage';
//import ProductCatalog from './pages/ecommerce/ProductCatalog';
//import ShoppingCartPage from './pages/ecommerce/ShoppingCart';
//import CheckoutPage from './pages/ecommerce/Checkout';
//import PaymentPage from './pages/ecommerce/PaymentPage';
//import OrderConfirmation from './pages/ecommerce/OrderConfirmation';
//import QuoteRequest from './pages/ecommerce/QuoteRequest';
//import { CartProvider } from './pages/ecommerce/CartContext'; // Correct path

function App() {
  return (
    // COMMENTED OUT: CartProvider wrapper for ecommerce functionality
    // <CartProvider> {/* Wrap entire app with CartProvider */}
      <Router>
        <div className="min-h-screen bg-white">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/stock" element={<StockPage />} />
              
              {/* COMMENTED OUT: eCommerce Routes */}
              {/* <Route path="/ecommerce" element={<ProductCatalog />} />
              <Route path="/ecommerce/cart" element={<ShoppingCartPage />} />
              <Route path="/ecommerce/checkout" element={<CheckoutPage />} />
              <Route path="/ecommerce/payment" element={<PaymentPage />} />
              <Route path="/ecommerce/order-confirmation" element={<OrderConfirmation />} />
              <Route path="/ecommerce/quote-request" element={<QuoteRequest />} /> */}
              
              {/* COMMENTED OUT: Alternative routes pointing to ProductCatalog */}
              {/* <Route path="/shop" element={<ProductCatalog />} />
              <Route path="/products" element={<ProductCatalog />} />
              <Route path="/catalog" element={<ProductCatalog />} /> */}
              
              {/* COMMENTED OUT: If you want to keep the old ECommercePage as a different route */}
              {/* <Route path="/ecommerce-landing" element={<ECommercePage />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    // COMMENTED OUT: CartProvider closing tag
    // </CartProvider>
  );
}

export default App;
