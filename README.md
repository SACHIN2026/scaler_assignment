# Flipkart Clone - E-Commerce Platform

A fully functional e-commerce web application that replicates Flipkart's design and user experience. Built as a full-stack application with React.js, Node.js, Express.js, and MySQL.


## Features

### Core Features (Implemented)

#### 1. Product Listing Page
-  Grid layout matching Flipkart's design aesthetic
-  Product cards with Flipkart-style UI elements
-  Search functionality to find products by name, brand, or description
-  Category-based filtering
-  Product rating and review counts
-  Discount badges and pricing display

#### 2. Product Detail Page
-  Image carousel with thumbnail navigation
-  Comprehensive product description and specifications
-  Price display with original price and discount
-  Stock availability status
-  "Add to Cart" button functionality
-  "Buy Now" button for direct checkout

#### 3. Shopping Cart
-  View all items added to cart
-  Update product quantity with +/- controls
-  Remove items from cart
-  Cart summary with subtotal, discount, and total amount
-  Free delivery indication
-  Savings calculation display

#### 4. Order Placement
-  Checkout page with comprehensive shipping address form
-  Form validation for all required fields
-  Order summary review before placing order
-  Place order functionality with database transaction
-  Order confirmation page displaying the order ID
-  Order details with items, pricing, and shipping information

### Bonus Features (Implemented)

-  **Responsive Design**: Fully responsive across mobile, tablet, and desktop devices
-  **Sticky Navigation**: Persistent header for easy navigation
-  **Cart Badge**: Real-time cart item count in the header
-  **Empty States**: User-friendly messages for empty cart and no search results
-  **Loading States**: Smooth loading indicators for better UX

##  Tech Stack

### Frontend
- **Framework**: React.js 18.2.0
- **Routing**: React Router DOM 6.20.0
- **HTTP Client**: Axios 1.6.2
- **Styling**: Custom CSS with Flipkart-inspired design system
- **Fonts**: Google Fonts (Roboto)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **Database Driver**: MySQL2 3.6.5
- **Middleware**: CORS, Body-Parser
- **Environment**: dotenv 16.3.1

### Database
- **DBMS**: MySQL
- **Schema Design**: Normalized relational database with proper foreign keys and indexes

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v5.7 or higher)
- npm or yarn package manager

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
   
   Create a `.env` file in the backend directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=flipkart_clone
```

4. **Create database and tables**
```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE flipkart_clone;

# Exit MySQL
exit

# Run schema file
mysql -u root -p flipkart_clone < database/schema.sql
```

5. **Seed the database with sample data**
```bash
npm run seed
```

6. **Start the backend server**
```bash
npm start
# Or for development with auto-reload
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure API URL (Optional)**
   
   Create a `.env` file in the frontend directory if your backend is not on localhost:5000:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Start the development server**
```bash
npm start
```

Frontend will run on `http://localhost:3000`

### Accessing the Application

1. Open your browser and navigate to `http://localhost:3000`
2. Browse products, add items to cart, and place orders
3. Default user is automatically logged in

## API Endpoints

### Products
- `GET /api/products` - Get all products (with optional search and category filters)
- `GET /api/products/:id` - Get single product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create new category

### Cart
- `GET /api/cart` - Get cart items for user
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item quantity
- `DELETE /api/cart/:id` - Remove item from cart
- `POST /api/cart/clear` - Clear entire cart

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get all orders for user
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/number/:orderNumber` - Get order by order number


## 📝 Assumptions Made

1. **User Authentication**: 
   - Assumed a default user is logged in (user_id: 1)
   - No login/signup functionality implemented as per requirements
   - Authentication can be easily added in future

2. **Payment Integration**:
   - Payment gateway integration not implemented
   - Orders are placed directly without payment processing
   - Payment status assumed as completed

3. **Image Hosting**:
   - Product images use external URLs (Unsplash)
   - No image upload functionality
   - In production, would use cloud storage (AWS S3, Cloudinary)

4. **Delivery Charges**:
   - Free delivery for all orders
   - No distance-based or price-based delivery charge calculation

5. **Stock Management**:
   - Basic stock tracking implemented
   - No automatic stock reduction on order placement (can be added)

6. **Order Status**:
   - Orders default to "pending" status
   - No admin panel for status updates (future enhancement)

7. **Data Validation**:
   - Basic validation on frontend and backend
   - Comprehensive validation can be enhanced

### Code Organization
```
project/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Request handlers
│   ├── models/          # Database models
│   ├── routes/          # API routes
│   ├── database/        # SQL schema
│   ├── server.js        # Express server
│   └── seed.js          # Database seeding
├── frontend/
│   ├── public/          # Static files
│   └── src/
│       ├── components/  # React components
│       ├── services/    # API service layer
│       ├── App.js       # Main application
│       └── index.js     # Entry point
```

