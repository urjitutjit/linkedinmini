'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { LogOut, User, Home, Search } from 'lucide-react';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-linkedin-blue rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">ML</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Mini LinkedIn</span>
            </Link>
          </div>

          {/* Navigation Links */}
          {user && (
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/" 
                className="flex items-center space-x-1 text-gray-700 hover:text-linkedin-blue transition-colors"
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
              
              <Link 
                href="/search" 
                className="flex items-center space-x-1 text-gray-700 hover:text-linkedin-blue transition-colors"
              >
                <Search size={20} />
                <span>Search</span>
              </Link>
            </div>
          )}

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link 
                  href={`/profile/${user.id}`}
                  className="flex items-center space-x-2 text-gray-700 hover:text-linkedin-blue transition-colors"
                >
                  <User size={20} />
                  <span className="hidden sm:block">{user.name}</span>
                </Link>
                
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <LogOut size={20} />
                  <span className="hidden sm:block">Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/login"
                  className="text-linkedin-blue hover:text-linkedin-blue-dark font-medium"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register"
                  className="btn-primary"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
