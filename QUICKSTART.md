# Quick Setup Instructions

## 🚀 Quick Start (5 Minutes)

### 1. Setup Database (2 minutes)

```bash
# Login to MySQL
mysql -u root -p

# Create database and run schema
CREATE DATABASE flipkart_clone;
exit

# Import schema
mysql -u root -p flipkart_clone < backend/database/schema.sql
```

### 2. Setup Backend (1 minute)

```bash
cd backend

# Install dependencies
npm install

# Create .env file
# Copy .env.example to .env and update your MySQL password

# Seed database
npm run seed

# Start server
npm start
```

Backend runs on: http://localhost:5000

### 3. Setup Frontend (2 minutes)

```bash
cd frontend

# Install dependencies
npm install

# Start application
npm start
```

Frontend runs on: http://localhost:3000

---

## ✅ Verification

1. Open http://localhost:3000
2. You should see product listings
3. Try searching for products
4. Click on a product
5. Add to cart
6. Complete checkout

---

## 🎯 Default Configuration

- **Backend Port**: 5000
- **Frontend Port**: 3000
- **Database**: flipkart_clone
- **Default User ID**: 1 (auto-logged in)

---

## 🐛 Troubleshooting

### Backend won't start
- Check if MySQL is running
- Verify .env file has correct credentials
- Check if port 5000 is available

### Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check browser console for errors
- Verify proxy in package.json

### Database errors
- Ensure database is created
- Verify schema is imported
- Check user permissions

---

## 📦 Sample Data

The seed script creates:
- 8 categories
- 12 products across different categories
- Product images from Unsplash
- Complete specifications and pricing

---

## 🎨 UI Components

Built components:
- ✅ Header with search and cart
- ✅ Product List with filters
- ✅ Product Card
- ✅ Category Filter
- ✅ Product Detail with carousel
- ✅ Shopping Cart
- ✅ Checkout Form
- ✅ Order Confirmation

---

For detailed setup instructions, see [README.md](README.md)
For deployment guide, see [DEPLOYMENT.md](DEPLOYMENT.md)
