# Vercel Environment Variables Setup

## Required Environment Variables for Production Deployment

Copy and paste these environment variables in your Vercel project settings:

### 1. NEXT_PUBLIC_API_URL
```
NEXT_PUBLIC_API_URL=https://your-project-name.vercel.app/api
```
**Note:** Replace `your-project-name` with your actual Vercel project name. This will be auto-generated when you deploy.

### 2. MONGODB_URI
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/minilinkedin?retryWrites=true&w=majority
```
**Setup Instructions:**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free account and cluster
3. Create a database user with username/password
4. Get your connection string and replace the placeholder values
5. Make sure to whitelist Vercel's IP addresses (or use 0.0.0.0/0 for all IPs)

### 3. JWT_SECRET
```
JWT_SECRET=fa9735bb089bd0c1dce8b3f361edef7c100322d4f7c6c9b6c20166e132f134fd48cf7cc6ef009d704b21ff1ab27bfbd76a4be332bcdc11acd3371da677768ede
```
**Note:** This is a cryptographically secure 128-character secret generated for your project.

### 4. NODE_ENV
```
NODE_ENV=production
```

## How to Add These Variables in Vercel:

1. Go to your Vercel dashboard
2. Select your project
3. Navigate to **Settings** → **Environment Variables**
4. Add each variable one by one:
   - Variable Name: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-project-name.vercel.app/api`
   - Environment: Select **Production**, **Preview**, and **Development**

5. Repeat for all variables above

## MongoDB Atlas Setup (Free Tier):

1. **Create Account:** Sign up at [MongoDB Atlas](https://cloud.mongodb.com/)
2. **Create Cluster:** Choose the free M0 cluster
3. **Database Access:** Create a database user with username/password
4. **Network Access:** Add IP address `0.0.0.0/0` (allows access from anywhere)
5. **Connect:** Get your connection string and update the MONGODB_URI above

## After Setting Up:

1. Deploy your project to Vercel
2. Update the `NEXT_PUBLIC_API_URL` with your actual Vercel domain
3. Test your deployment

## Security Notes:

- Never commit the actual `.env` files to Git
- The JWT_SECRET provided is unique and secure for production use
- MongoDB Atlas free tier includes 512MB storage which is perfect for development/demo
- Consider upgrading MongoDB Atlas for production applications with high traffic

## Troubleshooting:

- If API calls fail, check that `NEXT_PUBLIC_API_URL` matches your deployed domain
- If database connection fails, verify MongoDB Atlas network access settings
- If authentication fails, ensure JWT_SECRET is set correctly in Vercel
