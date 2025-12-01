# Products by Category API - Test Guide

## Overview
This guide shows how to test the "Get Products by Category ID" API endpoint.

## Prerequisites
1. Run migrations to create tables and seed data:
```bash
npm run migration:run
```

## API Endpoint

### Get All Products by Category ID
**Endpoint:** `GET /api/v1/products/category/:categoryId`

**Description:** Retrieves all products that belong to a specific category.

**Response:** Returns an array of products with their category information.

**Note:** The API uses versioning (v1) and runs on port 8080.

---

## Test Cases

### 1. Get Electronics Products (Category ID: 1)
```bash
GET http://localhost:8080/api/v1/products/category/1
```

**Expected Response:**
```json
[
  {
    "productId": 1,
    "productName": "iPhone 15 Pro",
    "price": 999.99,
    "quantity": 50,
    "categoryId": 1,
    "category": {
      "categoryId": 1,
      "categoryName": "Electronics",
      "description": "Electronic devices and gadgets"
    }
  },
  {
    "productId": 2,
    "productName": "Samsung Galaxy S24",
    "price": 899.99,
    "quantity": 45,
    "categoryId": 1,
    "category": {
      "categoryId": 1,
      "categoryName": "Electronics",
      "description": "Electronic devices and gadgets"
    }
  },
  // ... more electronics products
]
```

### 2. Get Clothing Products (Category ID: 2)
```bash
GET http://localhost:8080/api/v1/products/category/2
```

**Expected Products:**
- Nike Air Max Sneakers
- Levi's 501 Jeans
- Adidas Hoodie
- Polo Ralph Lauren Shirt
- North Face Jacket

### 3. Get Food & Beverages (Category ID: 3)
```bash
GET http://localhost:8080/api/v1/products/category/3
```

**Expected Products:**
- Organic Coffee Beans 1kg
- Premium Green Tea Box
- Dark Chocolate Bar Pack
- Almond Milk 1L
- Energy Drink Pack (12)

### 4. Get Books (Category ID: 4)
```bash
GET http://localhost:8080/api/v1/products/category/4
```

**Expected Products:**
- Clean Code - Robert Martin
- The Pragmatic Programmer
- Design Patterns
- JavaScript: The Good Parts
- Atomic Habits

### 5. Get Sports & Outdoors (Category ID: 5)
```bash
GET http://localhost:8080/api/v1/products/category/5
```

**Expected Products:**
- Yoga Mat Premium
- Dumbbells Set 20kg
- Camping Tent 4-Person
- Mountain Bike
- Running Shoes

### 6. Get Home & Kitchen (Category ID: 6)
```bash
GET http://localhost:8080/api/v1/products/category/6
```

**Expected Products:**
- Coffee Maker Machine
- Blender Pro 1000W
- Air Fryer 5L
- Vacuum Cleaner Robot
- Kitchen Knife Set

### 7. Get Products from Non-Existent Category (Category ID: 999)
```bash
GET http://localhost:8080/api/v1/products/category/999
```

**Expected Response:**
```json
[]
```

---

## Testing with cURL / PowerShell

### Example 1: Get Electronics
```bash
# cURL (Git Bash / Linux / Mac)
curl -X GET http://localhost:8080/api/v1/products/category/1

# PowerShell
Invoke-WebRequest -Uri "http://localhost:8080/api/v1/products/category/1" -Method GET
```

### Example 2: Get Clothing
```bash
# cURL
curl -X GET http://localhost:8080/api/v1/products/category/2

# PowerShell
Invoke-WebRequest -Uri "http://localhost:8080/api/v1/products/category/2" -Method GET
```

### Example 3: Get Books
```bash
# cURL
curl -X GET http://localhost:8080/api/v1/products/category/4

# PowerShell
Invoke-WebRequest -Uri "http://localhost:8080/api/v1/products/category/4" -Method GET
```

---

## Testing with Postman or REST Client

1. **Method:** GET
2. **URL:** `http://localhost:8080/api/v1/products/category/{categoryId}`
3. **Replace** `{categoryId}` with any number from 1-6
4. **Headers:** No special headers required
5. **Body:** No body required

---

## Available Category IDs

| Category ID | Category Name       | Number of Products |
|-------------|---------------------|-------------------|
| 1           | Electronics         | 6                 |
| 2           | Clothing            | 5                 |
| 3           | Food & Beverages    | 5                 |
| 4           | Books               | 5                 |
| 5           | Sports & Outdoors   | 5                 |
| 6           | Home & Kitchen      | 5                 |

**Total Products:** 31 products across 6 categories

---

## Other Useful Endpoints

### Get All Products
```bash
GET http://localhost:8080/api/v1/products
```

### Get Single Product by ID
```bash
GET http://localhost:8080/api/v1/products/:id
```

### Get All Categories
```bash
GET http://localhost:8080/api/v1/categories
```

---

## Notes
- The route `/products/category/:categoryId` is placed before `/products/:id` in the controller to avoid route conflicts
- All products include their category information in the response due to the `relations: ['category']` option
- Empty array `[]` is returned if no products found for the specified category ID

