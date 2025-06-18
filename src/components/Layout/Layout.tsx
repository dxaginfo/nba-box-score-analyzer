import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path === '/') return 'Dashboard';
    if (path.startsWith('/box-score')) return 'Box Score';
    if (path === '/player-comparison') return 'Player Comparison';
    if (path === '/team-efficiency') return 'Team Efficiency';
    if (path === '/game-flow') return 'Game Flow';
    
    return 'NBA Box Score Analyzer';
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar for navigation */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title={getPageTitle()} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
          {/* Mobile breadcrumbs */}
          <div className="mb-4 md:hidden text-sm">
            <Link to="/" className="text-nba-blue hover:underline">Home</Link>
            {location.pathname !== '/' && (
              <>
                <span className="mx-2">/</span>
                <span className="font-medium">{getPageTitle()}</span>
              </>
            )}
          </div>
          
          {/* Page content */}
          <div className="container mx-auto px-2 py-4">
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4">
          <div className="container mx-auto">
            <p className="text-center text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} NBA Box Score Analyzer | Demo App
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;