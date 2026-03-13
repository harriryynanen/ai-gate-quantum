
import React from 'react';
import { Link } from 'react-router-dom';
import { BeakerIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Branding */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-gray-800 hover:text-indigo-600 transition">
              <BeakerIcon className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold">QuantumFlow</span>
            </Link>
          </div>

          {/* Main Navigation - Simplified for core workflow */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-gray-900 font-medium transition">Dashboard</Link>
            <Link to="/history" className="text-gray-600 hover:text-gray-900 font-medium transition">History</Link>
            {/* Additional links can be added here as needed */}
          </nav>

          {/* User Profile Section */}
          <div className="flex items-center">
             <UserCircleIcon className="h-8 w-8 text-gray-400 hover:text-gray-600 transition cursor-pointer"/>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
