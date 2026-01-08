# 📁 Project Structure

```
flipkart-clone/
│
├── backend/                          # Node.js + Express Backend
│   ├── config/
│   │   └── database.js              # MySQL connection configuration
│   │
│   ├── controllers/                 # Request handlers
│   │   ├── productController.js     # Product CRUD operations
│   │   ├── cartController.js        # Cart management
│   │   ├── orderController.js       # Order processing
│   │   └── categoryController.js    # Category operations
│   │
│   ├── models/                      # Database models
│   │   ├── Product.js               # Product model with queries
│   │   ├── Cart.js                  # Cart model with queries
│   │   ├── Order.js                 # Order model with queries
│   │   └── Category.js              # Category model with queries
│   │
│   ├── routes/                      # API route definitions
│   │   ├── productRoutes.js         # /api/products routes
│   │   ├── cartRoutes.js            # /api/cart routes
│   │   ├── orderRoutes.js           # /api/orders routes
│   │   └── categoryRoutes.js        # /api/categories routes
│   │
│   ├── database/
│   │   └── schema.sql               # Complete database schema
│   │
│   ├── .env                         # Environment variables (gitignored)
│   ├── .env.example                 # Example environment variables
│   ├── .gitignore                   # Git ignore rules
│   ├── package.json                 # Backend dependencies
│   ├── server.js                    # Express server entry point
│   └── seed.js                      # Database seeding script
│
├── frontend/                        # React.js Frontend
│   ├── public/
│   │   └── index.html               # HTML template
│   │
│   ├── src/
│   │   ├── components/              # React components
│   │   │   ├── Header/
│   │   │   │   ├── Header.js        # Navigation header
│   │   │   │   └── Header.css       # Header styles
│   │   │   │
│   │   │   ├── ProductList/
│   │   │   │   ├── ProductList.js   # Product grid page
│   │   │   │   └── ProductList.css  # List styles
│   │   │   │
│   │   │   ├── ProductCard/
│   │   │   │   ├── ProductCard.js   # Individual product card
│   │   │   │   └── ProductCard.css  # Card styles
│   │   │   │
│   │   │   ├── CategoryFilter/
│   │   │   │   ├── CategoryFilter.js # Category sidebar
│   │   │   │   └── CategoryFilter.css
│   │   │   │
│   │   │   ├── ProductDetail/
│   │   │   │   ├── ProductDetail.js  # Product detail page
│   │   │   │   └── ProductDetail.css # Detail styles
│   │   │   │
│   │   │   ├── Cart/
│   │   │   │   ├── Cart.js           # Shopping cart page
│   │   │   │   └── Cart.css          # Cart styles
│   │   │   │
│   │   │   ├── Checkout/
│   │   │   │   ├── Checkout.js       # Checkout page
│   │   │   │   └── Checkout.css      # Checkout styles
│   │   │   │
│   │   │   └── OrderConfirmation/
│   │   │       ├── OrderConfirmation.js  # Order success page
│   │   │       └── OrderConfirmation.css # Confirmation styles
│   │   │
│   │   ├── services/
│   │   │   └── api.js                # API service layer (Axios)
│   │   │
│   │   ├── App.js                    # Main app component with routing
│   │   ├── index.js                  # React entry point
│   │   └── index.css                 # Global styles
│   │
│   ├── .env.example                  # Example environment variables
│   ├── .gitignore                    # Git ignore rules
│   └── package.json                  # Frontend dependencies
│
├── .gitignore                        # Root git ignore
├── README.md                         # Main documentation
├── QUICKSTART.md                     # Quick setup guide
├── DEPLOYMENT.md                     # Deployment instructions
└── API_DOCUMENTATION.md              # API reference

```

## 📊 File Statistics

### Backend
- **Total Files**: 16
- **Controllers**: 4 files
- **Models**: 4 files
- **Routes**: 4 files
- **Configuration**: 3 files

### Frontend
- **Total Files**: 20+
- **Components**: 8 component folders (16 files)
- **Services**: 1 file
- **Core Files**: 3 files

### Documentation
- **README.md**: Comprehensive project documentation
- **QUICKSTART.md**: 5-minute setup guide
- **DEPLOYMENT.md**: Cloud deployment guide
- **API_DOCUMENTATION.md**: Complete API reference

## 🎯 Key Features by File

### Backend Files

| File | Purpose | Key Features |
|------|---------|--------------|
| `server.js` | Express server | CORS, Routes, Error handling |
| `database.js` | DB connection | MySQL pool, Promise support |
| `productController.js` | Product logic | CRUD, Search, Filters |
| `cartController.js` | Cart logic | Add, Update, Remove, Clear |
| `orderController.js` | Order logic | Create, Retrieve, Transaction |
| `Product.js` | Product model | Queries with joins, Filters |
| `Cart.js` | Cart model | User cart management |
| `Order.js` | Order model | Transaction handling |
| `seed.js` | Data seeding | 8 categories, 12 products |

### Frontend Files

| File | Purpose | Key Features |
|------|---------|--------------|
| `App.js` | Main app | Routing, Cart count state |
| `api.js` | API layer | Axios calls, Centralized |
| `Header.js` | Navigation | Search, Cart badge |
| `ProductList.js` | Product grid | Filters, Search, Loading |
| `ProductCard.js` | Product item | Pricing, Rating, Discount |
| `CategoryFilter.js` | Sidebar | Radio buttons, Clear |
| `ProductDetail.js` | Detail page | Carousel, Specs, Actions |
| `Cart.js` | Cart page | Quantity, Remove, Summary |
| `Checkout.js` | Checkout | Form, Validation, Order |
| `OrderConfirmation.js` | Success | Order details, Items |

## 🗂 Database Tables

| Table | Rows (Seeded) | Purpose |
|-------|---------------|---------|
| `categories` | 8 | Product categories |
| `products` | 12 | Product catalog |
| `cart` | 0 | User shopping carts |
| `orders` | 0 | Placed orders |
| `order_items` | 0 | Order line items |
| `wishlist` | 0 | User wishlists (bonus) |

## 🎨 CSS Styling

### Color Palette (Flipkart Theme)
- **Primary Blue**: `#2874f0`
- **Orange**: `#ff9f00`
- **Buy Now**: `#fb641b`
- **Success Green**: `#388e3c`
- **Text Dark**: `#212121`
- **Text Gray**: `#878787`
- **Background**: `#f1f3f6`

### Typography
- **Font Family**: Roboto (Google Fonts)
- **Weights**: 300, 400, 500, 700

## 📦 Dependencies

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "mysql2": "^3.6.5",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "body-parser": "^1.20.2"
}
```

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.2"
}
```

## 🔗 API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List all products |
| GET | `/api/products/:id` | Get product details |
| GET | `/api/categories` | List categories |
| GET | `/api/cart` | Get cart items |
| POST | `/api/cart` | Add to cart |
| PUT | `/api/cart/:id` | Update quantity |
| DELETE | `/api/cart/:id` | Remove from cart |
| POST | `/api/orders` | Place order |
| GET | `/api/orders/:id` | Get order details |

## 🎯 Component Hierarchy

```
App
├── Header (persistent)
│   ├── Logo
│   ├── SearchBar
│   └── Navigation
│       └── CartLink (with badge)
│
└── Routes
    ├── ProductList
    │   ├── CategoryFilter
    │   └── ProductCard (multiple)
    │
    ├── ProductDetail
    │   ├── ImageCarousel
    │   ├── ProductInfo
    │   ├── Specifications
    │   └── ActionButtons
    │
    ├── Cart
    │   ├── CartItems
    │   └── CartSummary
    │
    ├── Checkout
    │   ├── AddressForm
    │   └── OrderSummary
    │
    └── OrderConfirmation
        ├── SuccessMessage
        ├── OrderDetails
        └── OrderItems
```

## 💾 Data Flow

1. **Product Browsing**: Frontend → API → Database → Response → Display
2. **Add to Cart**: Action → API call → Database update → Cart count update
3. **Checkout**: Form submit → Order API → Transaction → Cart clear → Confirmation
4. **Search**: Input → API with query → Filtered results → Display

## 🔒 Security Features

- Environment variables for sensitive data
- Parameterized SQL queries (SQL injection prevention)
- CORS configuration
- Input validation on frontend and backend
- Unique constraints on database

## 📈 Performance Optimizations

- Database indexes on frequently queried columns
- Connection pooling for database
- React component memoization ready
- Image lazy loading ready
- Responsive images with proper sizing

## 🎓 Code Quality

- **Modular Architecture**: Clear separation of concerns
- **Reusable Components**: DRY principle followed
- **Consistent Naming**: camelCase for JS, kebab-case for CSS
- **Error Handling**: Try-catch blocks, user-friendly messages
- **Comments**: Where necessary for complex logic
- **Clean Code**: No console.logs in production

---

This structure follows industry best practices and is scalable for future enhancements!
