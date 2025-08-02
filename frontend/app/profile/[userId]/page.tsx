'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { usersAPI } from '@/lib/api';
import { User, Post, UserProfileResponse } from '@/types';
import Navbar from '@/components/Navbar';
import PostCard from '@/components/PostCard';
import { Calendar, Mail, Edit, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const params = useParams();
  const userId = params.userId as string;
  const { user: currentUser } = useAuth();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', bio: '' });
  const [isUpdating, setIsUpdating] = useState(false);

  const isOwnProfile = currentUser?.id === userId;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await usersAPI.getProfile(userId);
        const profileData: UserProfileResponse = response.data;
        
        setProfileUser(profileData.user);
        setPosts(profileData.posts);
        setEditForm({
          name: profileData.user.name,
          bio: profileData.user.bio || ''
        });
      } catch (error: any) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOwnProfile || isUpdating) return;

    setIsUpdating(true);
    try {
      const response = await usersAPI.updateProfile({
        name: editForm.name.trim(),
        bio: editForm.bio.trim()
      });
      
      setProfileUser(response.data.user);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error('Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePostUpdate = (updatedPost: Post) => {
    setPosts(prev => prev.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  };

  const handlePostDelete = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-linkedin-blue"></div>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">User not found</h1>
            <p className="text-gray-600">The profile you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
          {/* Cover Photo */}
          <div className="h-32 bg-gradient-to-r from-linkedin-blue to-linkedin-blue-light rounded-t-lg"></div>
          
          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
              {/* Avatar */}
              <div className="relative -mt-16 mb-4 sm:mb-0">
                <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                  <span className="text-4xl font-bold text-linkedin-blue">
                    {profileUser.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              
              {/* User Details */}
              <div className="flex-1">
                {isEditing && isOwnProfile ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div>
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                        className="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-linkedin-blue focus:outline-none w-full"
                        maxLength={50}
                        required
                      />
                    </div>
                    <div>
                      <textarea
                        value={editForm.bio}
                        onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell us about yourself..."
                        className="w-full text-gray-600 bg-gray-50 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-linkedin-blue"
                        rows={3}
                        maxLength={500}
                      />
                    </div>
                    <div className="flex space-x-3">
                      <button
                        type="submit"
                        disabled={isUpdating}
                        className="btn-primary disabled:opacity-50"
                      >
                        {isUpdating ? 'Saving...' : 'Save'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsEditing(false);
                          setEditForm({
                            name: profileUser.name,
                            bio: profileUser.bio || ''
                          });
                        }}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <h1 className="text-2xl font-bold text-gray-900">
                        {profileUser.name}
                      </h1>
                      {isOwnProfile && (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="flex items-center space-x-1 text-linkedin-blue hover:text-linkedin-blue-dark"
                        >
                          <Edit size={16} />
                          <span>Edit</span>
                        </button>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <Mail size={16} />
                        <span>{profileUser.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} />
                        <span>
                          Joined {formatDistanceToNow(new Date(profileUser.joinDate), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    
                    {profileUser.bio && (
                      <p className="text-gray-700 leading-relaxed">
                        {profileUser.bio}
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-linkedin-blue">{posts.length}</div>
              <div className="text-gray-600">Posts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-linkedin-blue">
                {posts.reduce((total, post) => total + post.likesCount, 0)}
              </div>
              <div className="text-gray-600">Total Likes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-linkedin-blue">
                {posts.reduce((total, post) => total + post.commentsCount, 0)}
              </div>
              <div className="text-gray-600">Total Comments</div>
            </div>
          </div>
        </div>

        {/* Posts Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            {isOwnProfile ? 'Your Posts' : `${profileUser.name}'s Posts`}
          </h2>
          
          {posts.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {isOwnProfile ? 'No posts yet' : 'No posts to show'}
              </h3>
              <p className="text-gray-600">
                {isOwnProfile 
                  ? 'Share your first post with the community!' 
                  : 'This user hasn\'t shared any posts yet.'
                }
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onPostUpdate={handlePostUpdate}
                  onPostDelete={handlePostDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
