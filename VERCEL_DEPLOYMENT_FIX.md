# 🚀 Vercel Deployment Fix - Environment Variables

## ❌ Problem Solved
The error "Environment Variable 'NEXT_PUBLIC_API_URL' references Secret 'api_url', which does not exist" has been resolved by removing the conflicting `env` section from `vercel.json`.

## ✅ Correct Setup Process

### Step 1: Set Environment Variables in Vercel Dashboard

Go to your Vercel project → **Settings** → **Environment Variables** and add these **exactly**:

#### Variable 1:
- **Name:** `NEXT_PUBLIC_API_URL`
- **Value:** `https://your-project-name.vercel.app/api`
- **Environments:** Production, Preview, Development

#### Variable 2:
- **Name:** `MONGODB_URI`
- **Value:** `mongodb+srv://username:password@cluster.mongodb.net/minilinkedin?retryWrites=true&w=majority`
- **Environments:** Production, Preview, Development

#### Variable 3:
- **Name:** `JWT_SECRET`
- **Value:** `fa9735bb089bd0c1dce8b3f361edef7c100322d4f7c6c9b6c20166e132f134fd48cf7cc6ef009d704b21ff1ab27bfbd76a4be332bcdc11acd3371da677768ede`
- **Environments:** Production, Preview, Development

#### Variable 4:
- **Name:** `NODE_ENV`
- **Value:** `production`
- **Environments:** Production

### Step 2: Deploy Again

After adding the environment variables, redeploy your project:

1. Go to **Deployments** tab
2. Click **Redeploy** on your latest deployment
3. Or push a new commit to trigger automatic deployment

### Step 3: Update API URL After First Deployment

1. After successful deployment, note your Vercel domain (e.g., `https://minilinkedin-abc123.vercel.app`)
2. Update the `NEXT_PUBLIC_API_URL` environment variable to: `https://your-actual-domain.vercel.app/api`
3. Redeploy once more

## 🔧 What Was Fixed

- Removed the `env` section from `vercel.json` that was causing conflicts
- Environment variables should only be set in Vercel dashboard, not in config files
- The `vercel.json` now only handles routing and build configuration

## 📋 MongoDB Atlas Setup (If Not Done)

1. Sign up at [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free M0 cluster
3. Create database user with username/password
4. Set Network Access to `0.0.0.0/0` (allow all IPs)
5. Get connection string and replace in `MONGODB_URI` above

## ✅ Your deployment should now work without the environment variable error!
