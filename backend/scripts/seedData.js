const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Post = require('../models/Post');
require('dotenv').config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/minilinkedin');
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});
    console.log('Cleared existing data');

    // Create demo users
    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        bio: 'Software Engineer passionate about web development and creating innovative solutions. Love working with React, Node.js, and modern web technologies.'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        bio: 'Product Manager with 5+ years of experience in tech startups. Focused on user experience and data-driven product decisions.'
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: 'password123',
        bio: 'Full-stack developer and tech enthusiast. Building scalable applications and mentoring junior developers.'
      },
      {
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        password: 'password123',
        bio: 'UX Designer creating beautiful and intuitive user experiences. Passionate about accessibility and inclusive design.'
      },
      {
        name: 'David Brown',
        email: 'david@example.com',
        password: 'password123',
        bio: 'DevOps Engineer specializing in cloud infrastructure and automation. AWS certified and Kubernetes enthusiast.'
      }
    ];

    const createdUsers = [];
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
      console.log(`Created user: ${user.name}`);
    }

    // Create demo posts
    const posts = [
      {
        content: 'Just finished building a new React application with Next.js 14! The new app directory structure is amazing and makes development so much more intuitive. Excited to share more about my experience with the community! 🚀',
        author: createdUsers[0]._id
      },
      {
        content: 'Had an amazing product strategy session today. Key takeaway: Always start with the user problem, not the solution. Understanding your users deeply is the foundation of any successful product. What\'s your approach to user research?',
        author: createdUsers[1]._id
      },
      {
        content: 'Mentoring junior developers has been one of the most rewarding parts of my career. Today I helped a new developer understand async/await in JavaScript. Seeing that "aha!" moment never gets old. Remember, we all started somewhere! 💡',
        author: createdUsers[2]._id
      },
      {
        content: 'Working on a new design system for our platform. Consistency is key in creating great user experiences. Every component should feel like it belongs to the same family. What are your favorite design systems to reference?',
        author: createdUsers[3]._id
      },
      {
        content: 'Successfully migrated our entire infrastructure to Kubernetes today! The scalability and reliability improvements are already showing. DevOps is all about making developers\' lives easier while ensuring system reliability. ⚙️',
        author: createdUsers[4]._id
      },
      {
        content: 'Just attended an amazing tech conference! The talks on AI and machine learning were particularly inspiring. It\'s incredible how fast this field is evolving. What new technologies are you most excited about?',
        author: createdUsers[0]._id
      },
      {
        content: 'Product management tip: Your roadmap should be a living document, not set in stone. Market conditions change, user needs evolve, and new opportunities arise. Stay flexible and data-driven in your decisions! 📊',
        author: createdUsers[1]._id
      },
      {
        content: 'Code review best practices: Be kind, be constructive, and remember we\'re all learning. A good code review should teach something to both the author and the reviewer. Let\'s build each other up! 👥',
        author: createdUsers[2]._id
      }
    ];

    for (const postData of posts) {
      const post = new Post(postData);
      await post.save();
      console.log(`Created post by ${createdUsers.find(u => u._id.equals(post.author)).name}`);
    }

    console.log('✅ Seed data created successfully!');
    console.log('\nDemo accounts you can use:');
    users.forEach(user => {
      console.log(`📧 ${user.email} | 🔑 ${user.password}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
