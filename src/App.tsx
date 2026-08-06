import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollControls } from './components/common/ScrollControls';
import { VelvetBackground } from './components/common/VelvetBackground';
import { TracingBeam } from './components/common/TracingBeam';
import { cubicBezier } from 'motion';

// Layout & Overlays
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { SearchBarModal } from './components/layout/SearchBarModal';
import { QuickViewModal } from './components/common/QuickViewModal';
import { SizeCalculatorModal } from './components/common/SizeCalculatorModal';
import { ToastContainer } from './components/common/ToastContainer';
import { AiStylistDrawer } from './components/common/AiStylistDrawer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderTrackingPage } from './pages/OrderTrackingPage';
import { WishlistPage } from './pages/WishlistPage';
import { ComparePage } from './pages/ComparePage';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { PolicyPage } from './pages/PolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 8
  },

  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: cubicBezier(0.16, 1, 0.3, 1)
    }
  },

  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.25,
      ease: cubicBezier(0.7, 0, 0.84, 0)
    }
  }
};

const AppContent: React.FC = () => {
  const { activePage } = useApp();

  const renderCurrentPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'tracking':
        return <OrderTrackingPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'compare':
        return <ComparePage />;
      case 'auth':
        return <AuthPage />;
      case 'profile':
        return <ProfilePage />;
      case 'admin':
        return <AdminDashboardPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'policy':
        return <PolicyPage />;
      default:
        return <NotFoundPage />;
    }
  };

  return (
    <VelvetBackground>
      <div className="min-h-screen flex flex-col bg-transparent text-white transition-colors font-sans">
        {/* Scroll Progress & Back-To-Top */}
        <ScrollControls />

        {/* Toast Notification Container */}
        <ToastContainer />

        {/* Main Top Navbar */}
        <Navbar />

        {/* Dynamic Page Router with Tracing Beam & GPU-Accelerated Framer Motion */}
        <TracingBeam>
          <main className="flex-1 overflow-x-hidden min-h-[80vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageVariants}
                className="w-full"
                >
                {renderCurrentPage()}
              </motion.div>
            </AnimatePresence>
          </main>
        </TracingBeam>

        {/* Global Footer */}
        <Footer />

        {/* Slide-over Drawers & Interactive Modals */}
        <CartDrawer />
        <SearchBarModal />
        <QuickViewModal />
        <SizeCalculatorModal />
        <AiStylistDrawer />
      </div>
    </VelvetBackground>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
