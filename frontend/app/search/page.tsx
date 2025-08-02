'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { usersAPI } from '@/lib/api';
import { User, SearchUsersResponse } from '@/types';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Search, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

export default function SearchPage() {
  const { user } = useAuth();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || loading) return;

    setLoading(true);
    setHasSearched(true);
    try {
      const response = await usersAPI.searchUsers(query.trim());
      const searchData: SearchUsersResponse = response.data;
      setResults(searchData.users);
    } catch (error: any) {
      toast.error('Failed to search users');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Please sign in to search users
            </h1>
            <Link href="/login" className="btn-primary">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Users
          </h1>
          <p className="text-gray-600">
            Find and connect with professionals in the community
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <form onSubmit={handleSearch} className="flex space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-linkedin-blue focus:border-transparent"
                maxLength={100}
              />
            </div>
            <button
              type="submit"
              disabled={!query.trim() || loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 px-6"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Search size={20} />
              )}
              <span>{loading ? 'Searching...' : 'Search'}</span>
            </button>
          </form>
        </div>

        {/* Search Results */}
        <div>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-linkedin-blue"></div>
            </div>
          ) : hasSearched ? (
            results.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
                <Users size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No users found
                </h3>
                <p className="text-gray-600">
                  Try searching with different keywords or check your spelling.
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">
                    Search Results
                  </h2>
                  <span className="text-gray-600">
                    {results.length} user{results.length !== 1 ? 's' : ''} found
                  </span>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {results.map((searchUser) => (
                    <div
                      key={searchUser.id}
                      className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-linkedin-blue rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-xl">
                            {searchUser.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/profile/${searchUser.id}`}
                            className="font-semibold text-gray-900 hover:text-linkedin-blue transition-colors block truncate"
                          >
                            {searchUser.name}
                          </Link>
                          <p className="text-sm text-gray-600 truncate">
                            {searchUser.email}
                          </p>
                        </div>
                      </div>
                      
                      {searchUser.bio && (
                        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                          {searchUser.bio}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Joined {formatDistanceToNow(new Date(searchUser.joinDate), { addSuffix: true })}
                        </span>
                        <Link
                          href={`/profile/${searchUser.id}`}
                          className="text-linkedin-blue hover:text-linkedin-blue-dark font-medium text-sm"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
              <Search size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Start your search
              </h3>
              <p className="text-gray-600">
                Enter a name in the search box above to find users in the community.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
