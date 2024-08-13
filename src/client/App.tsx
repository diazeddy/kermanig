import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CollectionDetailPage from './pages/CollectionDetailPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';

import './App.css';

type AppLayoutProps = {
  children: ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => (
  <>
    <Header />
    <div>{children}</div>
    <Footer />
  </>
)

const App: React.FC = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collections/:key" element={<CollectionDetailPage />} />
          <Route path="/products/:key" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
