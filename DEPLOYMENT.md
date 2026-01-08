# 🚀 Deployment Guide

This guide provides step-by-step instructions for deploying the Flipkart Clone application to various cloud platforms.

## Table of Contents
- [Backend Deployment](#backend-deployment)
- [Database Deployment](#database-deployment)
- [Frontend Deployment](#frontend-deployment)
- [Environment Variables](#environment-variables)

---

## Backend Deployment

### Option 1: Render (Recommended for Backend)

1. **Create Account**: Sign up at [render.com](https://render.com)

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     ```
     Name: flipkart-clone-backend
     Environment: Node
     Region: Choose nearest
     Branch: main
     Root Directory: backend
     Build Command: npm install
     Start Command: npm start
     ```

3. **Add Environment Variables**:
   - Go to "Environment" tab
   - Add:
     ```
     PORT=5000
     DB_HOST=<your-mysql-host>
     DB_USER=<your-mysql-user>
     DB_PASSWORD=<your-mysql-password>
     DB_NAME=flipkart_clone
     ```

4. **Deploy**: Click "Create Web Service"

5. **Note Your Backend URL**: `https://your-app-name.onrender.com`

### Option 2: Railway

1. **Create Account**: Sign up at [railway.app](https://railway.app)

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure**:
   - Root Directory: `/backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

4. **Add Environment Variables** (same as Render)

5. **Deploy**: Railway will auto-deploy

---

## Database Deployment

### Option 1: PlanetScale (MySQL)

1. **Create Account**: Sign up at [planetscale.com](https://planetscale.com)

2. **Create Database**:
   - Click "Create a database"
   - Name: `flipkart-clone`
   - Region: Choose nearest

3. **Get Connection Details**:
   - Go to "Connect" → "Node.js"
   - Copy connection details

4. **Run Schema**:
   ```bash
   # Install PlanetScale CLI
   brew install planetscale/tap/pscale
   
   # Connect to database
   pscale shell flipkart-clone main
   
   # Copy and paste schema from database/schema.sql
   ```

5. **Seed Database**:
   - Update backend `.env` with PlanetScale credentials
   - Run: `npm run seed`

### Option 2: AWS RDS MySQL

1. **Create RDS Instance**:
   - Go to AWS RDS Console
   - Create database (MySQL)
   - Choose free tier
   - Note credentials

2. **Configure Security Group**:
   - Allow inbound traffic on port 3306
   - Add your application's IP

3. **Connect and Setup**:
   ```bash
   mysql -h your-rds-endpoint.amazonaws.com -u admin -p
   # Run schema.sql
   ```

### Option 3: Free MySQL Hosting

**FreeSQLDatabase.com** or **db4free.net**:
1. Sign up for free account
2. Create database
3. Note connection details
4. Use MySQL Workbench to run schema

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Create Account**: Sign up at [vercel.com](https://vercel.com)

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. **Configure**:
   ```
   Framework Preset: Create React App
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: build
   ```

4. **Environment Variables**:
   - Add: `REACT_APP_API_URL=https://your-backend-url.com/api`

5. **Deploy**: Click "Deploy"

6. **Your URL**: `https://your-app.vercel.app`

### Option 2: Netlify

1. **Create Account**: Sign up at [netlify.com](https://netlify.com)

2. **Deploy Site**:
   - Click "Add new site" → "Import from Git"
   - Choose repository

3. **Build Settings**:
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/build
   ```

4. **Environment Variables**:
   - Site settings → Environment variables
   - Add: `REACT_APP_API_URL`

5. **Deploy**: Netlify will auto-deploy

### Option 3: GitHub Pages

1. **Add to package.json**:
   ```json
   {
     "homepage": "https://yourusername.github.io/flipkart-clone",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

---

## Environment Variables

### Backend (.env)
```env
# Server
PORT=5000

# Database
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=flipkart_clone

# Optional
NODE_ENV=production
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## Post-Deployment Checklist

### Backend
- [ ] Server is running and accessible
- [ ] Health check endpoint works: `GET /api/health`
- [ ] Database connection successful
- [ ] All API endpoints responding correctly
- [ ] CORS configured for frontend domain

### Database
- [ ] All tables created successfully
- [ ] Sample data seeded
- [ ] Indexes created
- [ ] Foreign keys working

### Frontend
- [ ] Application loads correctly
- [ ] API calls working
- [ ] All pages accessible
- [ ] Responsive design working
- [ ] Images loading properly

---

## Testing Deployed Application

### 1. Test API Endpoints
```bash
# Health Check
curl https://your-backend-url.com/api/health

# Get Products
curl https://your-backend-url.com/api/products

# Get Categories
curl https://your-backend-url.com/api/categories
```

### 2. Test Frontend
- Open deployed URL
- Browse products
- Search functionality
- Add to cart
- Place order
- Check order confirmation

---

## Common Issues & Solutions

### Issue: Frontend can't connect to Backend
**Solution**: 
- Check REACT_APP_API_URL in frontend environment variables
- Verify CORS is enabled in backend for your frontend domain
- Check backend is running and accessible

### Issue: Database connection failed
**Solution**:
- Verify database credentials
- Check if database host is accessible
- Ensure database user has proper permissions
- Check if database exists

### Issue: Build fails on deployment
**Solution**:
- Check Node version compatibility
- Verify all dependencies in package.json
- Check for any syntax errors
- Review build logs

### Issue: 502 Bad Gateway
**Solution**:
- Check if backend server is running
- Verify PORT environment variable
- Check server logs for errors

---

## Monitoring & Maintenance

### Backend Monitoring
- Check server logs regularly
- Monitor API response times
- Track error rates
- Database connection pool status

### Frontend Monitoring
- Check browser console for errors
- Monitor page load times
- Track user interactions
- Check for broken images/links

---

## Updating Deployed Application

### Backend Updates
1. Push changes to GitHub
2. Platform auto-deploys (Render/Railway)
3. Or manually trigger deployment

### Frontend Updates
1. Push changes to GitHub
2. Vercel/Netlify auto-deploys
3. Or run `npm run deploy` for GitHub Pages

### Database Updates
1. Backup existing data
2. Run migration scripts
3. Test thoroughly
4. Update in production

---

## Cost Estimation

### Free Tier Options
- **Backend**: Render Free (sleeps after inactivity)
- **Database**: PlanetScale Free (1 database)
- **Frontend**: Vercel/Netlify Free (unlimited sites)

**Total: $0/month** for low-traffic applications

### Paid Options (for production)
- **Backend**: Render Basic ($7/month)
- **Database**: PlanetScale Scaler ($29/month)
- **Frontend**: Vercel Pro ($20/month)

**Total: ~$56/month** for production-ready setup

---

## Security Recommendations

1. **Environment Variables**: Never commit .env files
2. **HTTPS**: Always use HTTPS in production
3. **Database**: Use strong passwords, enable SSL
4. **API**: Implement rate limiting
5. **CORS**: Restrict to your frontend domain only
6. **SQL Injection**: Use parameterized queries (already implemented)
7. **Input Validation**: Validate all user inputs
8. **Authentication**: Add JWT tokens for production

---

## Support

If you encounter any issues during deployment:
1. Check platform-specific documentation
2. Review application logs
3. Test locally first
4. Check GitHub Issues for similar problems

---

**Good Luck with your deployment! 🚀**
