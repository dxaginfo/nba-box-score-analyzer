import { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  title: string;
  toggleSidebar: () => void;
}

const Navbar = ({ title, toggleSidebar }: NavbarProps) => {
  const [searchOpen, setSearchOpen] = useState(false);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Hamburger Menu (Mobile) & Title */}
          <div className="flex items-center">
            <button 
              className="md:hidden mr-4 text-gray-500 hover:text-gray-700"
              onClick={toggleSidebar}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <Link to="/" className="flex items-center">
              <img 
                src="/basketball-icon.svg" 
                alt="NBA Box Score Analyzer Logo" 
                className="h-8 w-8 mr-3" 
              />
              <div>
                <h1 className="text-xl font-bold text-nba-blue hidden md:block">NBA Box Score Analyzer</h1>
                <span className="text-lg font-semibold block md:hidden">{title}</span>
              </div>
            </Link>
          </div>
          
          {/* Center: Navigation (Desktop) */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-nba-blue hover:underline">Dashboard</Link>
            <Link to="/player-comparison" className="text-gray-700 hover:text-nba-blue hover:underline">Player Comparison</Link>
            <Link to="/team-efficiency" className="text-gray-700 hover:text-nba-blue hover:underline">Team Stats</Link>
            <Link to="/game-flow" className="text-gray-700 hover:text-nba-blue hover:underline">Game Flow</Link>
          </nav>
          
          {/* Right: Search & User */}
          <div className="flex items-center">
            {/* Search */}
            <div className="relative mr-4">
              {searchOpen ? (
                <div className="absolute right-0 top-0 w-64">
                  <input
                    type="text"
                    placeholder="Search games, players..."
                    className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nba-blue"
                  />
                  <button
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                    onClick={toggleSearch}
                    aria-label="Close search"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <button
                  className="text-gray-500 hover:text-gray-700"
                  onClick={toggleSearch}
                  aria-label="Search"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              )}
            </div>
            
            {/* Theme Toggle */}
            <button 
              className="text-gray-500 hover:text-gray-700 mr-4"
              aria-label="Toggle dark mode"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;