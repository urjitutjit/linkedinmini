# Mini LinkedIn - Professional Community Platform

A modern, full-stack social networking platform inspired by LinkedIn, built with cutting-edge technologies for professional networking and community engagement.

## 🚀 Live Demo

- **Frontend**: [deployed on Vercel]
- **Backend API**: [deployed on Render]

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (React 18)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Forms**: React Hook Form
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Date Handling**: date-fns

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Validation**: Express Validator
- **CORS**: Enabled for cross-origin requests

### Deployment
- **Frontend**: Vercel (Recommended)
- **Backend**: Render / Railway
- **Database**: MongoDB Atlas (Cloud)

## ✨ Features

### 🔐 User Authentication
- **Registration**: Create account with name, email, password, and optional bio
- **Login**: Secure authentication with JWT tokens
- **Profile Management**: Edit name and bio
- **Session Management**: Persistent login with secure token storage

### 📝 Post Management
- **Create Posts**: Share text-based posts (up to 1000 characters)
- **View Feed**: Chronological feed of all community posts
- **Like Posts**: Like/unlike posts with real-time counter updates
- **Comment System**: Add comments to posts (up to 500 characters)
- **Delete Posts**: Authors can delete their own posts

### 👤 User Profiles
- **Profile Pages**: View any user's profile with their information and posts
- **Profile Statistics**: Display post count, total likes, and comments
- **Join Date**: Show when users joined the platform
- **Bio Display**: Rich text bio with professional information

### 🔍 User Search
- **Search Functionality**: Find users by name
- **Search Results**: Grid layout with user cards
- **Profile Links**: Direct navigation to user profiles

### 🎨 User Experience
- **Responsive Design**: Mobile-first, works on all devices
- **Modern UI**: Clean, professional LinkedIn-inspired interface
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Toast Notifications**: Real-time feedback for user actions

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd minilinkedin
```

### 2. Install Dependencies

```bash
# Install root dependencies (for concurrent development)
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to root directory
cd ..
```

### 3. Environment Configuration

#### Backend Environment (.env)
Create `backend/.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/minilinkedin
JWT_SECRET=your_super_secure_jwt_secret_key_here_make_it_long_and_random
NODE_ENV=development
```

#### Frontend Environment (.env.local)
Create `frontend/.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Database will be created automatically

#### Option B: MongoDB Atlas (Recommended)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in `backend/.env`

### 5. Run the Application

#### Development Mode (Recommended)
```bash
# Run both frontend and backend concurrently
npm run dev
```

#### Separate Terminals
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **API Health Check**: http://localhost:5000/api/health

## 👥 Demo Accounts

For testing purposes, you can create accounts or use these demo credentials:

### Demo User 1
- **Email**: john@example.com
- **Password**: password123
- **Name**: John Doe
- **Bio**: Software Engineer passionate about web development

### Demo User 2
- **Email**: jane@example.com
- **Password**: password123
- **Name**: Jane Smith
- **Bio**: Product Manager with 5+ years of experience

## 📁 Project Structure

```
minilinkedin/
├── backend/                 # Express.js API server
│   ├── models/             # Mongoose schemas
│   │   ├── User.js         # User model
│   │   └── Post.js         # Post model
│   ├── routes/             # API routes
│   │   ├── auth.js         # Authentication routes
│   │   ├── users.js        # User management routes
│   │   └── posts.js        # Post management routes
│   ├── middleware/         # Custom middleware
│   │   └── auth.js         # JWT authentication middleware
│   ├── server.js           # Express server setup
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Environment variables template
├── frontend/               # Next.js React application
│   ├── app/                # Next.js 13+ app directory
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   ├── profile/        # Profile pages
│   │   └── search/         # Search page
│   ├── components/         # Reusable React components
│   │   ├── Navbar.tsx      # Navigation component
│   │   ├── PostCard.tsx    # Post display component
│   │   └── CreatePost.tsx  # Post creation component
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx # Authentication context
│   ├── lib/                # Utility libraries
│   │   └── api.ts          # API client configuration
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # Shared types
│   ├── package.json        # Frontend dependencies
│   └── .env.local.example  # Environment variables template
├── package.json            # Root package.json for scripts
└── README.md              # This file
```

## 🔧 Available Scripts

### Root Directory
- `npm run dev` - Run both frontend and backend in development mode
- `npm run install-all` - Install dependencies for all projects

### Backend (`cd backend`)
- `npm run dev` - Start backend in development mode with nodemon
- `npm start` - Start backend in production mode

### Frontend (`cd frontend`)
- `npm run dev` - Start frontend in development mode
- `npm run build` - Build frontend for production
- `npm start` - Start frontend in production mode

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. **Connect to Vercel**:
   ```bash
   npm i -g vercel
   cd frontend
   vercel
   ```

2. **Environment Variables**:
   Add in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL=https://your-backend-url.com/api`

### Backend Deployment (Render)

1. **Create Render Account**: Sign up at [Render](https://render.com)

2. **Deploy Backend**:
   - Connect your GitHub repository
   - Select backend folder
   - Add environment variables:
     - `MONGODB_URI=your_mongodb_atlas_connection_string`
     - `JWT_SECRET=your_secure_jwt_secret`
     - `NODE_ENV=production`

3. **Update Frontend**:
   Update `NEXT_PUBLIC_API_URL` in Vercel to point to your Render backend URL

## 🧪 Testing

### Manual Testing Checklist

#### Authentication
- [ ] User registration with validation
- [ ] User login with correct credentials
- [ ] Login failure with incorrect credentials
- [ ] Logout functionality
- [ ] Protected routes redirect to login

#### Posts
- [ ] Create new post
- [ ] View posts in feed
- [ ] Like/unlike posts
- [ ] Add comments to posts
- [ ] Delete own posts
- [ ] Cannot delete others' posts

#### Profiles
- [ ] View own profile
- [ ] View other users' profiles
- [ ] Edit own profile (name and bio)
- [ ] Profile statistics display correctly

#### Search
- [ ] Search users by name
- [ ] View search results
- [ ] Navigate to profiles from search

## 🐛 Troubleshooting

### Common Issues

#### Backend won't start
- Check MongoDB connection
- Verify environment variables
- Ensure port 5000 is available

#### Frontend won't start
- Check if backend is running
- Verify API URL in environment variables
- Clear Next.js cache: `rm -rf .next`

#### Database connection issues
- Verify MongoDB is running (local) or connection string (Atlas)
- Check network connectivity
- Verify database credentials

#### CORS errors
- Ensure backend CORS is configured correctly
- Check API URL in frontend environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by LinkedIn's professional networking platform
- Built with modern web development best practices
- Designed for scalability and maintainability

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing GitHub issues
3. Create a new issue with detailed information
4. Include error messages and steps to reproduce

---

**Happy Networking! 🚀**
