# 🛒 Flipkart Clone - E-Commerce Platform

A fully functional e-commerce web application that replicates Flipkart's design and user experience. Built as a full-stack application with React.js, Node.js, Express.js, and MySQL.

## 🚀 Live Demo

- **Frontend**: [Deployed Link]
- **Backend API**: [Deployed Link]
- **GitHub Repository**: [Your Repository Link]

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Database Schema](#database-schema)
- [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Assumptions Made](#assumptions-made)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### Core Features (Implemented)

#### 1. Product Listing Page
- ✅ Grid layout matching Flipkart's design aesthetic
- ✅ Product cards with Flipkart-style UI elements
- ✅ Search functionality to find products by name, brand, or description
- ✅ Category-based filtering
- ✅ Product rating and review counts
- ✅ Discount badges and pricing display

#### 2. Product Detail Page
- ✅ Image carousel with thumbnail navigation
- ✅ Comprehensive product description and specifications
- ✅ Price display with original price and discount
- ✅ Stock availability status
- ✅ "Add to Cart" button functionality
- ✅ "Buy Now" button for direct checkout

#### 3. Shopping Cart
- ✅ View all items added to cart
- ✅ Update product quantity with +/- controls
- ✅ Remove items from cart
- ✅ Cart summary with subtotal, discount, and total amount
- ✅ Free delivery indication
- ✅ Savings calculation display

#### 4. Order Placement
- ✅ Checkout page with comprehensive shipping address form
- ✅ Form validation for all required fields
- ✅ Order summary review before placing order
- ✅ Place order functionality with database transaction
- ✅ Order confirmation page displaying the order ID
- ✅ Order details with items, pricing, and shipping information

### Bonus Features (Implemented)

- ✅ **Responsive Design**: Fully responsive across mobile, tablet, and desktop devices
- ✅ **Sticky Navigation**: Persistent header for easy navigation
- ✅ **Cart Badge**: Real-time cart item count in the header
- ✅ **Empty States**: User-friendly messages for empty cart and no search results
- ✅ **Loading States**: Smooth loading indicators for better UX
- ✅ **Order History Structure**: Database schema ready for order history feature

## 🛠 Tech Stack

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

## 🗄 Database Schema

### Tables

#### 1. **categories**
```sql
- id (Primary Key)
- name (VARCHAR)
- description (TEXT)
- created_at (TIMESTAMP)
```

#### 2. **products**
```sql
- id (Primary Key)
- name (VARCHAR)
- description (TEXT)
- price (DECIMAL)
- original_price (DECIMAL)
- discount_percentage (INT)
- category_id (Foreign Key → categories)
- brand (VARCHAR)
- stock (INT)
- rating (DECIMAL)
- reviews_count (INT)
- image_url (TEXT)
- images (JSON Array)
- specifications (JSON Object)
- created_at (TIMESTAMP)

Indexes: category_id, price
```

#### 3. **cart**
```sql
- id (Primary Key)
- user_id (INT, default 1)
- product_id (Foreign Key → products)
- quantity (INT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

Unique Key: (user_id, product_id)
```

#### 4. **orders**
```sql
- id (Primary Key)
- user_id (INT, default 1)
- order_number (VARCHAR, unique)
- total_amount (DECIMAL)
- shipping_address (TEXT)
- shipping_name (VARCHAR)
- shipping_phone (VARCHAR)
- status (ENUM: pending, processing, shipped, delivered, cancelled)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

Indexes: user_id, order_number
```

#### 5. **order_items**
```sql
- id (Primary Key)
- order_id (Foreign Key → orders)
- product_id (Foreign Key → products)
- quantity (INT)
- price (DECIMAL)
- created_at (TIMESTAMP)
```

#### 6. **wishlist** (Bonus)
```sql
- id (Primary Key)
- user_id (INT, default 1)
- product_id (Foreign Key → products)
- created_at (TIMESTAMP)

Unique Key: (user_id, product_id)
```

### Database Relationships
- One-to-Many: categories → products
- Many-to-One: cart → products
- One-to-Many: orders → order_items
- Many-to-One: order_items → products

## 📦 Installation & Setup

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
3. Default user is automatically logged in (user_id: 1)

## 🔌 API Endpoints

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

## 📸 Screenshots

[Add screenshots of your application here]

- Home/Product Listing Page
- Product Detail Page
- Shopping Cart
- Checkout Page
- Order Confirmation

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

## 🎯 Code Quality & Architecture

### Frontend Architecture
- **Component-Based**: Modular React components with clear separation of concerns
- **Service Layer**: Centralized API calls in `services/api.js`
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **State Management**: React hooks for local state management

### Backend Architecture
- **MVC Pattern**: Separation of routes, controllers, and models
- **Database Abstraction**: Models handle all database operations
- **Error Handling**: Consistent error handling and status codes
- **RESTful API**: Following REST principles for API design

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

## 🚀 Future Enhancements

### Planned Features
- [ ] User Authentication & Authorization (Login/Signup)
- [ ] Order History Page
- [ ] Wishlist Functionality
- [ ] Product Reviews & Ratings
- [ ] Advanced Filtering (Price range, Brand, Rating)
- [ ] Product Sorting (Price, Rating, Popularity)
- [ ] Email Notifications on Order Placement
- [ ] Admin Dashboard for Product & Order Management
- [ ] Payment Gateway Integration (Razorpay/Stripe)
- [ ] Order Tracking System
- [ ] User Profile Management
- [ ] Address Book for Multiple Addresses
- [ ] Product Recommendations
- [ ] Recently Viewed Products
- [ ] Flash Sales & Offers Section

### Technical Improvements
- [ ] Redux for State Management
- [ ] TypeScript Integration
- [ ] Unit & Integration Tests
- [ ] CI/CD Pipeline
- [ ] Docker Containerization
- [ ] API Rate Limiting
- [ ] Caching (Redis)
- [ ] Image Optimization & CDN
- [ ] Performance Monitoring
- [ ] Security Enhancements (JWT, HTTPS, Input Sanitization)

## 🤝 Contributing

This is an assignment project, but suggestions and feedback are welcome!

## 📄 License

This project is created for educational purposes as part of an internship assignment.

## 👨‍💻 Developer

Created with ❤️ by [Your Name]

## 📧 Contact

For any queries regarding this project:
- Email: [Your Email]
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

---

## 🎓 Learning Outcomes

Through this project, I gained hands-on experience with:
- Full-stack web development with MERN-like stack
- RESTful API design and implementation
- Relational database schema design
- React Router for SPA navigation
- Responsive web design principles
- E-commerce workflow implementation
- Git version control
- Project structuring and code organization

---

**Note**: This project closely replicates Flipkart's UI/UX for educational purposes only. All design credits go to Flipkart. This is not affiliated with or endorsed by Flipkart.
