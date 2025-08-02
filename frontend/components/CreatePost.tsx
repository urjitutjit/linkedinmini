'use client';

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { postsAPI } from '@/lib/api';
import { Post } from '@/types';
import { Send, Image } from 'lucide-react';
import toast from 'react-hot-toast';

interface CreatePostProps {
  onPostCreated?: (post: Post) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await postsAPI.createPost({ content: content.trim() });
      const newPost = response.data.post;
      onPostCreated?.(newPost);
      setContent('');
      toast.success('Post created successfully!');
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to create post';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-3">
          <div className="w-12 h-12 bg-linkedin-blue rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
          
          <div className="flex-1">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-linkedin-blue focus:border-transparent resize-none"
              rows={3}
              maxLength={1000}
              disabled={isSubmitting}
            />
            
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-4">
                <button
                  type="button"
                  className="flex items-center space-x-2 text-gray-500 hover:text-linkedin-blue transition-colors"
                  disabled
                >
                  <Image size={20} />
                  <span className="text-sm">Photo (Coming Soon)</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-400">
                  {content.length}/1000
                </span>
                <button
                  type="submit"
                  disabled={!content.trim() || isSubmitting}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <Send size={16} />
                  )}
                  <span>{isSubmitting ? 'Posting...' : 'Post'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
