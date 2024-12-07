import React from 'react';
import { Outlet } from 'react-router-dom';
import { usePageTracking } from '../../lib/analytics/hooks';
import Navbar from '../Navbar';
import Footer from '../Footer';

const Layout = () => {
  usePageTracking();

  return (
    <div className="min-h-screen bg-dark text-white flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;