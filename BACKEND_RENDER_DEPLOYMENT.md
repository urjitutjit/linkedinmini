# 🚀 Deploy Backend to Render - Fix Server Error

## The Problem
Your signup is failing because the backend API isn't deployed. Vercel is only serving your frontend, but your API routes need a separate Node.js server.

## Solution: Deploy Backend to Render (Free)

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with GitHub (recommended)
3. Connect your GitHub account

### Step 2: Deploy Backend
1. **Click "New +"** → **"Web Service"**
2. **Connect Repository**: Select `urjitutjit/linkedinmini`
3. **Configure Service**:
   - **Name**: `minilinkedin-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Region**: `Oregon (US West)` or closest to you
   - **Branch**: `main`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free` (0$/month)

### Step 3: Add Environment Variables
In the **Environment Variables** section, add these **exact values**:

```
MONGODB_URI=mongodb+srv://adityaurjitsrivastava:CTKmHZzv5q78zEhl@cluster0.lkyyzrc.mongodb.net/minilinkedin?retryWrites=true&w=majority&appName=Cluster0

JWT_SECRET=fa9735bb089bd0c1dce8b3f361edef7c100322d4f7c6c9b6c20166e132f134fd48cf7cc6ef009d704b21ff1ab27bfbd76a4be332bcdc11acd3371da677768ede

NODE_ENV=production

PORT=10000
```

### Step 4: Deploy
1. **Click "Create Web Service"**
2. **Wait for deployment** (2-3 minutes)
3. **Note your backend URL** (e.g., `https://minilinkedin-backend.onrender.com`)

### Step 5: Update Frontend Environment Variable
1. **Go to Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. **Edit** `NEXT_PUBLIC_API_URL`
3. **Update to**: `https://your-render-backend-url.onrender.com/api`
4. **Redeploy** your frontend

## ✅ After Deployment

Your architecture will be:
- **Frontend**: `https://linkedinminiurjit.vercel.app` (Vercel)
- **Backend**: `https://minilinkedin-backend.onrender.com` (Render)
- **Database**: MongoDB Atlas (Cloud)

## 🧪 Test Your Backend

After deployment, test these endpoints:
- `https://your-backend-url.onrender.com/api/health` - Should return "Mini LinkedIn API is running!"
- Try signup/login from your frontend

## 🔧 Troubleshooting

**Backend not starting?**
- Check Render logs for errors
- Verify all environment variables are set
- Ensure MongoDB Atlas allows all IPs (0.0.0.0/0)

**Frontend can't connect to backend?**
- Verify `NEXT_PUBLIC_API_URL` points to your Render backend
- Check CORS settings in backend
- Redeploy frontend after updating API URL

## 💡 Why This Setup?

- **Render**: Free tier perfect for Node.js backends
- **Vercel**: Excellent for Next.js frontends
- **MongoDB Atlas**: Managed database service
- **Separation**: Backend and frontend can scale independently
