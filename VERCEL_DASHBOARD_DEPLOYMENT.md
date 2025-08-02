# 🚀 Deploy Mini LinkedIn to Vercel Dashboard

## Step 1: Push Code to GitHub (if not already done)

1. **Initialize Git** (if not done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Mini LinkedIn project"
   ```

2. **Create GitHub Repository**:
   - Go to [GitHub.com](https://github.com)
   - Click "New Repository"
   - Name: `minilinkedin` or similar
   - Make it public
   - Don't initialize with README (you already have code)

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/yourusername/minilinkedin.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Deploy on Vercel Dashboard

1. **Go to Vercel Dashboard**: [vercel.com](https://vercel.com)
2. **Click "New Project"**
3. **Import from GitHub**: Select your `minilinkedin` repository
4. **Configure Project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

## Step 3: Add Environment Variables

In the Vercel project setup, click **"Environment Variables"** and add these **exact values**:

### Variable 1:
- **Name**: `NEXT_PUBLIC_API_URL`
- **Value**: `https://your-project-name.vercel.app/api`
- **Environments**: Production, Preview, Development

### Variable 2:
- **Name**: `MONGODB_URI`
- **Value**: `mongodb+srv://adityaurjitsrivastava:CTKmHZzv5q78zEhl@cluster0.lkyyzrc.mongodb.net/minilinkedin?retryWrites=true&w=majority&appName=Cluster0`
- **Environments**: Production, Preview, Development

### Variable 3:
- **Name**: `JWT_SECRET`
- **Value**: `fa9735bb089bd0c1dce8b3f361edef7c100322d4f7c6c9b6c20166e132f134fd48cf7cc6ef009d704b21ff1ab27bfbd76a4be332bcdc11acd3371da677768ede`
- **Environments**: Production, Preview, Development

### Variable 4:
- **Name**: `NODE_ENV`
- **Value**: `production`
- **Environments**: Production

## Step 4: Deploy

1. **Click "Deploy"** - Vercel will build and deploy your project
2. **Wait for deployment** to complete (usually 2-3 minutes)
3. **Note your deployment URL** (e.g., `https://minilinkedin-xyz123.vercel.app`)

## Step 5: Update API URL

1. **Go back to Environment Variables**
2. **Edit** `NEXT_PUBLIC_API_URL`
3. **Update** to your actual domain: `https://your-actual-domain.vercel.app/api`
4. **Redeploy** (go to Deployments tab → click "Redeploy")

## 🎉 Your Mini LinkedIn is Now Live!

Your application will be available at your Vercel URL with:
- ✅ Frontend (Next.js)
- ✅ Backend API routes
- ✅ MongoDB Atlas database
- ✅ JWT authentication
- ✅ Production environment

## Alternative: Direct Upload

If you don't want to use GitHub:
1. **Zip your project folder** (exclude `node_modules`, `.git`, `.env` files)
2. **Go to Vercel Dashboard** → "New Project"
3. **Drag and drop** your zip file
4. **Follow steps 3-5** above for environment variables and deployment

## Troubleshooting

- **Build fails**: Check that all dependencies are in `package.json`
- **API not working**: Verify `NEXT_PUBLIC_API_URL` matches your domain
- **Database errors**: Check MongoDB Atlas network access allows all IPs
- **Authentication issues**: Verify `JWT_SECRET` is set correctly
