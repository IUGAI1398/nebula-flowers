import { useState, useEffect } from 'react';
import './App.css';

// Components
import BackgroundStars from './components/BackgroundStars';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Catalog from './components/Catalog';
import QuickOrder from './components/QuickOrder';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';
import Toast from './components/Toast';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

// Products Service
import {
  fetchProducts,
  insertProduct,
  updateProduct,
  deleteProduct,
  resetProductsToDefault
} from './productsService';

// Translations
import { translations } from './translations';

function App() {
  const [lang, setLang] = useState('EN'); // Default to EN for Phuket
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Dynamic Products State & Loading States
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Routing State
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    sessionStorage.getItem('nebula_admin_session') === 'true'
  );

  // Load products from Supabase on mount
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProducts();
        if (isMounted) {
          setProducts(data);
        }
      } catch (err) {
        console.error('Error loading products from Supabase:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    load();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
      setIsAdminLoggedIn(sessionStorage.getItem('nebula_admin_session') === 'true');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (currentPath === '#/admin/login' && isAdminLoggedIn) {
      window.location.hash = '#/admin';
    }
  }, [currentPath, isAdminLoggedIn]);

  const handleOpenOrderModal = (product = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleShowToast = (message) => {
    setToastMessage(message);
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const saved = await insertProduct(newProduct);
      setProducts((prev) => [...prev, saved]);
      handleShowToast('Product launched successfully! ✦');
      return true;
    } catch (err) {
      console.error(err);
      handleShowToast(`Error adding product: ${err.message}`);
      return false;
    }
  };

  const handleEditProduct = async (updatedProduct) => {
    try {
      const saved = await updateProduct(updatedProduct);
      setProducts((prev) => prev.map((p) => p.id === saved.id ? saved : p));
      handleShowToast('Product updated successfully!');
      return true;
    } catch (err) {
      console.error(err);
      handleShowToast(`Error editing product: ${err.message}`);
      return false;
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      handleShowToast('Product deleted from catalog.');
      return true;
    } catch (err) {
      console.error(err);
      handleShowToast(`Error deleting product: ${err.message}`);
      return false;
    }
  };

  const handleResetDefaults = async () => {
    setIsLoading(true);
    try {
      const defaults = await resetProductsToDefault();
      setProducts(defaults);
      handleShowToast('Catalog reset to defaults.');
    } catch (err) {
      console.error(err);
      handleShowToast(`Error resetting: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    window.location.hash = '#/admin';
    handleShowToast('Welcome back, Commander!');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('nebula_admin_session');
    setIsAdminLoggedIn(false);
    window.location.hash = '#/admin/login';
    handleShowToast('Logged out of command center.');
  };

  const handleBackToSite = () => {
    window.location.hash = '#/';
  };

  const t = translations[lang];

  // Routing Logic
  if (currentPath === '#/admin' || currentPath.startsWith('#/admin?')) {
    if (!isAdminLoggedIn) {
      return (
        <AdminLogin 
          onLoginSuccess={handleLoginSuccess} 
          onBackToSite={handleBackToSite} 
        />
      );
    }
    return (
      <>
        <BackgroundStars count={50} />
        <AdminDashboard
          products={products}
          onAddProduct={handleAddProduct}
          onEditProduct={handleEditProduct}
          onDeleteProduct={handleDeleteProduct}
          onResetDefaults={handleResetDefaults}
          onLogout={handleLogout}
          onBackToSite={handleBackToSite}
          isLoading={isLoading}
        />
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      </>
    );
  }

  if (currentPath === '#/admin/login') {
    if (isAdminLoggedIn) {
      return null;
    }
    return (
      <AdminLogin 
        onLoginSuccess={handleLoginSuccess} 
        onBackToSite={handleBackToSite} 
      />
    );
  }

  // Render Public Site
  return (
    <>
      {/* Sparkly Starry Background */}
      <BackgroundStars count={80} />

      {/* Main Navigation Header with new SVG Logo */}
      <Header lang={lang} onChangeLang={setLang} t={t.nav} />

      {/* Hero section */}
      <Hero onOrderClick={() => handleOpenOrderModal(null)} t={t.hero} />

      {/* Advantage Highlights Bar */}
      <Features t={t.features} />

      {/* Main Split Section: Showcase Catalog & Quick Contact Form */}
      <div className="container split-section">
        <div className="split-grid">
          
          {/* Left Column: Showcase */}
          {isLoading ? (
            <div className="catalog-loading glass-panel" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
              width: '100%',
              gap: '20px'
            }}>
              <div className="loading-orbit">
                <div className="loading-planet"></div>
              </div>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                fontWeight: '600'
              }}>Fetching cosmic designs...</p>
            </div>
          ) : (
            <Catalog 
              products={products} 
              lang={lang} 
              onSelectProduct={handleOpenOrderModal} 
              t={t.catalog} 
            />
          )}

          {/* Right Column: Fast Contact Form */}
          <QuickOrder onSubmitSuccess={handleShowToast} t={t.quickOrder} />
          
        </div>
      </div>

      {/* Site Footer */}
      <Footer t={t.footer} />

      {/* Order Placement Modal */}
      <OrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedProduct={selectedProduct}
        products={products}
        lang={lang}
        onSubmitSuccess={handleShowToast}
        t={t}
      />

      {/* Floating Status Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </>
  );
}

export default App;
