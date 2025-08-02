const express = require('express');
const { body, validationResult } = require('express-validator');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/posts
// @desc    Create a new post
// @access  Private
router.post('/', auth, [
  body('content').trim().isLength({ min: 1, max: 1000 }).withMessage('Post content must be between 1 and 1000 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { content } = req.body;

    const post = new Post({
      content,
      author: req.user._id
    });

    await post.save();
    await post.populate('author', 'name email');

    res.status(201).json({
      message: 'Post created successfully',
      post: {
        id: post._id,
        content: post.content,
        author: post.author,
        likesCount: post.likes.length,
        commentsCount: post.comments.length,
        createdAt: post.createdAt
      }
    });
  } catch (error) {
    console.error('Create post error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/posts/feed
// @desc    Get posts feed (all posts)
// @access  Public
router.get('/feed', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find()
      .populate('author', 'name email bio')
      .populate('comments.user', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    res.json({
      posts: posts.map(post => ({
        id: post._id,
        content: post.content,
        author: post.author,
        likesCount: post.likes.length,
        commentsCount: post.comments.length,
        comments: post.comments.slice(0, 3).map(comment => ({
          id: comment._id,
          content: comment.content,
          user: comment.user,
          createdAt: comment.createdAt
        })),
        createdAt: post.createdAt
      })),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPosts / limit),
        totalPosts,
        hasNext: page < Math.ceil(totalPosts / limit),
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Get feed error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/posts/:postId
// @desc    Get single post by ID
// @access  Public
router.get('/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('author', 'name email bio')
      .populate('comments.user', 'name email');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json({
      post: {
        id: post._id,
        content: post.content,
        author: post.author,
        likesCount: post.likes.length,
        commentsCount: post.comments.length,
        comments: post.comments.map(comment => ({
          id: comment._id,
          content: comment.content,
          user: comment.user,
          createdAt: comment.createdAt
        })),
        createdAt: post.createdAt
      }
    });
  } catch (error) {
    console.error('Get post error:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/posts/:postId/like
// @desc    Like/Unlike a post
// @access  Private
router.put('/:postId/like', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if post is already liked by user
    const likeIndex = post.likes.findIndex(like => like.user.toString() === req.user._id.toString());

    if (likeIndex > -1) {
      // Unlike the post
      post.likes.splice(likeIndex, 1);
      await post.save();
      
      res.json({
        message: 'Post unliked',
        liked: false,
        likesCount: post.likes.length
      });
    } else {
      // Like the post
      post.likes.push({ user: req.user._id });
      await post.save();
      
      res.json({
        message: 'Post liked',
        liked: true,
        likesCount: post.likes.length
      });
    }
  } catch (error) {
    console.error('Like post error:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/posts/:postId/comment
// @desc    Add comment to post
// @access  Private
router.post('/:postId/comment', auth, [
  body('content').trim().isLength({ min: 1, max: 500 }).withMessage('Comment must be between 1 and 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        message: 'Validation failed', 
        errors: errors.array() 
      });
    }

    const { content } = req.body;
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = {
      user: req.user._id,
      content
    };

    post.comments.push(newComment);
    await post.save();
    await post.populate('comments.user', 'name email');

    const addedComment = post.comments[post.comments.length - 1];

    res.status(201).json({
      message: 'Comment added successfully',
      comment: {
        id: addedComment._id,
        content: addedComment.content,
        user: addedComment.user,
        createdAt: addedComment.createdAt
      },
      commentsCount: post.comments.length
    });
  } catch (error) {
    console.error('Add comment error:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/posts/:postId
// @desc    Delete a post
// @access  Private
router.delete('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user owns the post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(req.params.postId);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
