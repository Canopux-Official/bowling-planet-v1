import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminHeader } from '../components/AdminHeader';
import { AdminFooter } from '../components/AdminFooter';

import { theme } from '../../../theme';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1024);
      if (window.innerWidth > 1024) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: theme.colors.adminBg, fontFamily: '"Inter", sans-serif' }}>
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div 
        style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        marginLeft: sidebarOpen && isDesktop ? '260px' : '0px',
        transition: 'margin-left 0.3s ease',
        minWidth: 0 // Prevent flex blowout
      }}>
        <AdminHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
        
        <main style={{ padding: '24px 24px 0 24px', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, paddingBottom: '32px' }}>
            <Outlet />
          </div>
          <AdminFooter />
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden"
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 998,
            backdropFilter: 'blur(2px)'
          }}
        />
      )}
    </div>
  );
};
