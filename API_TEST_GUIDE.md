## Products by Category API - Test Guide

### Overview

This guide shows how to test the **"Get Products by Category ID"** API endpoint with the current schema, including **product variants**.

### Prerequisites

1. Run migrations to create tables and seed data:

```bash
yarn migration:run
```

2. Start the server (development mode):

```bash
yarn start:dev
```

By default the API runs at: `http://localhost:8080/api/v1`  
(you can override the port using the `PORT` environment variable).

---

## API Endpoint

### Get All Products by Category ID

- **Method:** `GET`
- **Endpoint:** `/api/v1/products/category/:categoryId`
- **Description:** Retrieves all products that belong to a specific category.
- **Response:** Returns an array of products including their **category** and **variants**.

**Example URL:**

```text
http://localhost:8080/api/v1/products/category/1
```

**Response Shape (simplified):**

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
    },
    "variants": [
      {
        "variantId": 1,
        "productId": 1,
        "size": "128GB",
        "color": "Black",
        "stock": 20
      },
      {
        "variantId": 2,
        "productId": 1,
        "size": "256GB",
        "color": "Silver",
        "stock": 30
      }
    ]
  }
]
```

---

## Test Cases

In all examples below, replace `CATEGORY_ID` with the desired value.

### 1. Get Electronics Products (Category ID: 1)

```bash
GET http://localhost:8080/api/v1/products/category/1
```

**Expected:**

- Danh sách các sản phẩm thuộc danh mục **Electronics**.
- Mỗi sản phẩm có:
  - Thông tin sản phẩm cơ bản
  - Trường `category` chứa thông tin danh mục
  - Trường `variants` là mảng biến thể (nếu có)

### 2. Get Clothing Products (Category ID: 2)

```bash
GET http://localhost:8080/api/v1/products/category/2
```

**Expected Products (ví dụ):**

- Nike Air Max Sneakers
- Levi's 501 Jeans
- Adidas Hoodie
- Polo Ralph Lauren Shirt
- North Face Jacket

### 3. Get Food & Beverages (Category ID: 3)

```bash
GET http://localhost:8080/api/v1/products/category/3
```

**Expected Products (ví dụ):**

- Organic Coffee Beans 1kg
- Premium Green Tea Box
- Dark Chocolate Bar Pack
- Almond Milk 1L
- Energy Drink Pack (12)

### 4. Get Books (Category ID: 4)

```bash
GET http://localhost:8080/api/v1/products/category/4
```

**Expected Products (ví dụ):**

- Clean Code - Robert Martin
- The Pragmatic Programmer
- Design Patterns
- JavaScript: The Good Parts
- Atomic Habits

### 5. Get Sports & Outdoors (Category ID: 5)

```bash
GET http://localhost:8080/api/v1/products/category/5
```

**Expected Products (ví dụ):**

- Yoga Mat Premium
- Dumbbells Set 20kg
- Camping Tent 4-Person
- Mountain Bike
- Running Shoes

### 6. Get Home & Kitchen (Category ID: 6)

```bash
GET http://localhost:8080/api/v1/products/category/6
```

**Expected Products (ví dụ):**

- Coffee Maker Machine
- Blender Pro 1000W
- Air Fryer 5L
- Vacuum Cleaner Robot
- Kitchen Knife Set

### 7. Get Products from Non-Existent Category (Category ID: 999)

```bash
GET http://localhost:8888/api/v1/products/category/999
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
3. **Replace** `{categoryId}` with any valid category ID (ví dụ: `1-6`)
4. **Headers:** No special headers required
5. **Body:** No body required

**Tips:**

- Kiểm tra các field sau trong response:
  - `productId`, `productName`, `price`, `quantity`, `categoryId`
  - `category.categoryName`
  - `variants` (mảng) với các field: `variantId`, `size`, `color`, `stock`

---

## Available Category IDs (ví dụ seed data)

| Category ID | Category Name     |
| ----------: | ----------------- |
|           1 | Electronics       |
|           2 | Clothing          |
|           3 | Food & Beverages  |
|           4 | Books             |
|           5 | Sports & Outdoors |
|           6 | Home & Kitchen    |

> Thống kê cụ thể số lượng sản phẩm có thể thay đổi tùy theo dữ liệu seed hoặc dữ liệu bạn thêm vào.

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

- The route `/products/category/:categoryId` is placed **before** `/products/:id` in the controller to avoid route conflicts.
- All products include both their **category** and **variants** in the response due to the `relations: ['category', 'variants']` option in `ProductsService`.
- Empty array `[]` is returned if no products are found for the specified category ID.
