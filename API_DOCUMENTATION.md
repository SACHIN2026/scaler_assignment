# API Documentation

Base URL: `http://localhost:5000/api`

## Products API

### Get All Products
```http
GET /products
```

**Query Parameters:**
- `search` (optional) - Search by product name, description, or brand
- `category` (optional) - Filter by category ID

**Response:**
```json
[
  {
    "id": 1,
    "name": "iPhone 15 Pro",
    "description": "Apple iPhone 15 Pro with A17 Pro chip",
    "price": 129900,
    "original_price": 139900,
    "discount_percentage": 7,
    "category_id": 5,
    "category_name": "Mobile Phones",
    "brand": "Apple",
    "stock": 25,
    "rating": 4.6,
    "reviews_count": 1523,
    "image_url": "https://...",
    "created_at": "2024-01-08T..."
  }
]
```

### Get Product by ID
```http
GET /products/:id
```

**Response:**
```json
{
  "id": 1,
  "name": "iPhone 15 Pro",
  "images": ["url1", "url2", "url3"],
  "specifications": {
    "Display": "6.1-inch Super Retina XDR",
    "Processor": "A17 Pro chip",
    "Camera": "48MP Main camera"
  },
  ...
}
```

---

## Categories API

### Get All Categories
```http
GET /categories
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Electronics",
    "description": "Electronic devices and accessories",
    "created_at": "2024-01-08T..."
  }
]
```

---

## Cart API

### Get Cart Items
```http
GET /cart?userId=1
```

**Response:**
```json
[
  {
    "id": 1,
    "user_id": 1,
    "product_id": 5,
    "quantity": 2,
    "name": "Sony WH-1000XM5",
    "price": 29990,
    "image_url": "https://...",
    "stock": 50,
    "discount_percentage": 14,
    "original_price": 34990
  }
]
```

### Add to Cart
```http
POST /cart
Content-Type: application/json

{
  "productId": 5,
  "quantity": 1,
  "userId": 1
}
```

**Response:**
```json
{
  "message": "Product added to cart successfully"
}
```

### Update Cart Item
```http
PUT /cart/:id
Content-Type: application/json

{
  "quantity": 3
}
```

### Remove from Cart
```http
DELETE /cart/:id
```

### Clear Cart
```http
POST /cart/clear
Content-Type: application/json

{
  "userId": 1
}
```

---

## Orders API

### Create Order
```http
POST /orders
Content-Type: application/json

{
  "user_id": 1,
  "items": [
    {
      "product_id": 5,
      "quantity": 2,
      "price": 29990
    }
  ],
  "total_amount": 59980,
  "shipping_address": "123 Main St, City, State - 123456",
  "shipping_name": "John Doe",
  "shipping_phone": "9876543210"
}
```

**Response:**
```json
{
  "message": "Order placed successfully",
  "orderId": 1,
  "orderNumber": "ORD1704723456789"
}
```

### Get User Orders
```http
GET /orders?userId=1
```

**Response:**
```json
[
  {
    "id": 1,
    "order_number": "ORD1704723456789",
    "total_amount": 59980,
    "status": "pending",
    "created_at": "2024-01-08T...",
    "items": [...]
  }
]
```

### Get Order by ID
```http
GET /orders/:id
```

### Get Order by Order Number
```http
GET /orders/number/:orderNumber
```

**Response:**
```json
{
  "id": 1,
  "order_number": "ORD1704723456789",
  "user_id": 1,
  "total_amount": 59980,
  "shipping_address": "123 Main St, City, State - 123456",
  "shipping_name": "John Doe",
  "shipping_phone": "9876543210",
  "status": "pending",
  "created_at": "2024-01-08T...",
  "items": [
    {
      "id": 1,
      "order_id": 1,
      "product_id": 5,
      "quantity": 2,
      "price": 29990,
      "name": "Sony WH-1000XM5",
      "image_url": "https://..."
    }
  ]
}
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

---

## Error Response Format

```json
{
  "error": "Error message description"
}
```

---

## Testing with cURL

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Search Products
```bash
curl "http://localhost:5000/api/products?search=iphone"
```

### Get Categories
```bash
curl http://localhost:5000/api/categories
```

### Add to Cart
```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "quantity": 1}'
```

### Place Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "items": [{"product_id": 1, "quantity": 1, "price": 129900}],
    "total_amount": 129900,
    "shipping_address": "123 Main St",
    "shipping_name": "John Doe",
    "shipping_phone": "9876543210"
  }'
```
