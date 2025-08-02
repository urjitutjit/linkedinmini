'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Post, Comment } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { postsAPI } from '@/lib/api';
import { Heart, MessageCircle, Trash2, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';

interface PostCardProps {
  post: Post;
  onPostUpdate?: (updatedPost: Post) => void;
  onPostDelete?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onPostUpdate, onPostDelete }) => {
  const { user } = useAuth();
  const [isLiking, setIsLiking] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isCommenting, setIsCommenting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleLike = async () => {
    if (!user || isLiking) return;
    
    setIsLiking(true);
    try {
      const response = await postsAPI.likePost(post.id);
      const updatedPost = {
        ...post,
        likesCount: response.data.likesCount,
        liked: response.data.liked
      };
      onPostUpdate?.(updatedPost);
    } catch (error: any) {
      toast.error('Failed to like post');
    } finally {
      setIsLiking(false);
    }
  };

  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim() || isCommenting) return;

    setIsCommenting(true);
    try {
      const response = await postsAPI.addComment(post.id, newComment.trim());
      const updatedPost = {
        ...post,
        commentsCount: response.data.commentsCount,
        comments: [...(post.comments || []), response.data.comment]
      };
      onPostUpdate?.(updatedPost);
      setNewComment('');
      toast.success('Comment added successfully');
    } catch (error: any) {
      toast.error('Failed to add comment');
    } finally {
      setIsCommenting(false);
    }
  };

  const handleDelete = async () => {
    if (!user || user.id !== post.author.id || isDeleting) return;
    
    if (!confirm('Are you sure you want to delete this post?')) return;

    setIsDeleting(true);
    try {
      await postsAPI.deletePost(post.id);
      onPostDelete?.(post.id);
      toast.success('Post deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete post');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-4">
      {/* Post Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-linkedin-blue rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {post.author.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <Link 
                href={`/profile/${post.author.id}`}
                className="font-semibold text-gray-900 hover:text-linkedin-blue transition-colors"
              >
                {post.author.name}
              </Link>
              <p className="text-sm text-gray-500">{post.author.email}</p>
              <p className="text-xs text-gray-400">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          
          {user && user.id === post.author.id && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              title="Delete post"
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="p-4">
        <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
          {post.content}
        </p>
      </div>

      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              disabled={!user || isLiking}
              className={`flex items-center space-x-2 transition-colors ${
                post.liked 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart size={20} fill={post.liked ? 'currentColor' : 'none'} />
              <span className="text-sm font-medium">{post.likesCount}</span>
            </button>
            
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-500 hover:text-linkedin-blue transition-colors"
            >
              <MessageCircle size={20} />
              <span className="text-sm font-medium">{post.commentsCount}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100">
          {/* Existing Comments */}
          {post.comments && post.comments.length > 0 && (
            <div className="p-4 space-y-3">
              {post.comments.map((comment: Comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 font-medium text-sm">
                      {comment.user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <Link 
                        href={`/profile/${comment.user.id}`}
                        className="font-medium text-sm text-gray-900 hover:text-linkedin-blue"
                      >
                        {comment.user.name}
                      </Link>
                      <p className="text-sm text-gray-700 mt-1">{comment.content}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 ml-3">
                      {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment */}
          {user && (
            <div className="p-4 border-t border-gray-100">
              <form onSubmit={handleComment} className="flex space-x-3">
                <div className="w-8 h-8 bg-linkedin-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 flex space-x-2">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-linkedin-blue focus:border-transparent"
                    maxLength={500}
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim() || isCommenting}
                    className="btn-primary px-3 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;
