## API Documentation - Oracle Backend

**Base URL (default dev):** `http://localhost:8080/api/v1`  
**Note:** Cổng có thể thay đổi qua biến môi trường `PORT` (mặc định `8080` nếu không cấu hình).

### 📊 Database Schema

Hệ thống quản lý bán hàng với 7 bảng:

- **CATEGORIES** - Danh mục sản phẩm
- **PRODUCTS** - Sản phẩm (FK → CATEGORIES)
- **PRODUCT_VARIANTS** - Biến thể sản phẩm (size, color, stock) (FK → PRODUCTS)
- **EMPLOYEES** - Nhân viên
- **CUSTOMERS** - Khách hàng
- **ORDERS** - Đơn hàng (FK → CUSTOMERS, EMPLOYEES)
- **ORDER_DETAILS** - Chi tiết đơn hàng (FK → ORDERS, PRODUCT_VARIANTS)

Tất cả endpoint bên dưới đều dùng prefix: `http://localhost:8080/api/v1`.

---

## 1. Categories API

### GET /categories

Lấy tất cả danh mục

```bash
curl http://localhost:8080/api/v1/categories
```

### GET /categories/:id

Lấy danh mục theo ID

```bash
curl http://localhost:8080/api/v1/categories/1
```

### POST /categories

Tạo danh mục mới

```bash
curl -X POST http://localhost:8080/api/v1/categories \
  -H "Content-Type: application/json" \
  -d '{
    "categoryName": "Electronics",
    "description": "Electronic devices"
  }'
```

### PUT /categories/:id

Cập nhật danh mục

```bash
curl -X PUT http://localhost:8080/api/v1/categories/1 \
  -H "Content-Type: application/json" \
  -d '{
    "categoryName": "Electronics Updated"
  }'
```

### DELETE /categories/:id

Xóa danh mục

```bash
curl -X DELETE http://localhost:8080/api/v1/categories/1
```

---

## 2. Products API

Entity `Product`:

- **productId**: number
- **productName**: string
- **price**: number
- **quantity**: number
- **categoryId**: number
- **category**: `Category`
- **variants**: `ProductVariant[]`

### GET /products

Lấy tất cả sản phẩm (bao gồm `category` và `variants`)

```bash
curl http://localhost:8080/api/v1/products
```

**Response Example:**

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

### GET /products/:id

Lấy sản phẩm theo ID (kèm `category` và `variants`)

```bash
curl http://localhost:8080/api/v1/products/1
```

### GET /products/category/:categoryId

Lấy tất cả sản phẩm theo `categoryId` (kèm `category` và `variants`)

```bash
curl http://localhost:8080/api/v1/products/category/1
```

### POST /products

Tạo sản phẩm mới (có thể tạo kèm danh sách biến thể)

```bash
curl -X POST http://localhost:8080/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Laptop Dell XPS 13",
    "price": 25000000,
    "quantity": 10,
    "categoryId": 1,
    "variants": [
      {
        "size": "16GB RAM / 512GB SSD",
        "color": "Silver",
        "stock": 5
      },
      {
        "size": "32GB RAM / 1TB SSD",
        "color": "Black",
        "stock": 5
      }
    ]
  }'
```

**Lưu ý:**

- Trường `variants` là **tùy chọn**.
- Nếu gửi `variants`, hệ thống sẽ tạo các bản ghi trong bảng `PRODUCT_VARIANTS` trong một transaction.

### PUT /products/:id

Cập nhật sản phẩm. Có thể:

- Cập nhật thông tin cơ bản (`productName`, `price`, `quantity`, `categoryId`)
- **Thay thế toàn bộ** danh sách `variants` (nếu gửi trường `variants`)

```bash
curl -X PUT http://localhost:8080/api/v1/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 24000000,
    "quantity": 15,
    "variants": [
      {
        "size": "16GB RAM / 512GB SSD",
        "color": "Silver",
        "stock": 8
      }
    ]
  }'
```

**Lưu ý:**  
Nếu gửi `variants`, tất cả biến thể cũ của sản phẩm sẽ bị xóa và thay thế bởi danh sách mới.

### DELETE /products/:id

Xóa sản phẩm (tất cả `variants` liên quan cũng bị xóa theo do `ON DELETE CASCADE`)

```bash
curl -X DELETE http://localhost:8080/api/v1/products/1
```

---

## 3. Product Variants API

Entity `ProductVariant`:

- **variantId**: number
- **productId**: number
- **size**: string \| null
- **color**: string \| null
- **stock**: number
- **product**: `Product`

### GET /product-variants

Lấy tất cả biến thể sản phẩm (kèm `product`)

```bash
curl http://localhost:8080/api/v1/product-variants
```

### GET /product-variants/:id

Lấy biến thể theo ID

```bash
curl http://localhost:8080/api/v1/product-variants/1
```

### GET /product-variants/product/:productId

Lấy tất cả biến thể theo `productId`

```bash
curl http://localhost:8080/api/v1/product-variants/product/1
```

### POST /product-variants

Tạo mới một biến thể cho sản phẩm

```bash
curl -X POST http://localhost:8080/api/v1/product-variants \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "size": "128GB",
    "color": "Black",
    "stock": 20
  }'
```

### PUT /product-variants/:id

Cập nhật biến thể

```bash
curl -X PUT http://localhost:8080/api/v1/product-variants/1 \
  -H "Content-Type: application/json" \
  -d '{
    "stock": 18
  }'
```

### DELETE /product-variants/:id

Xóa biến thể

```bash
curl -X DELETE http://localhost:8080/api/v1/product-variants/1
```

---

## 4. Employees API

### GET /employees

Lấy tất cả nhân viên

```bash
curl http://localhost:8080/api/v1/employees
```

### GET /employees/:id

Lấy nhân viên theo ID

```bash
curl http://localhost:8080/api/v1/employees/1
```

### POST /employees

Tạo nhân viên mới

```bash
curl -X POST http://localhost:8080/api/v1/employees \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Nguyen Van A",
    "phone": "0901234567",
    "position": "Sales Manager",
    "salary": 15000000,
    "hireDate": "2025-01-15"
  }'
```

### PUT /employees/:id

Cập nhật nhân viên

```bash
curl -X PUT http://localhost:8080/api/v1/employees/1 \
  -H "Content-Type: application/json" \
  -d '{
    "salary": 16000000,
    "position": "Senior Sales Manager"
  }'
```

### DELETE /employees/:id

Xóa nhân viên

```bash
curl -X DELETE http://localhost:8080/api/v1/employees/1
```

---

## 5. Customers API

### GET /customers

Lấy tất cả khách hàng

```bash
curl http://localhost:8080/api/v1/customers
```

### GET /customers/:id

Lấy khách hàng theo ID

```bash
curl http://localhost:8080/api/v1/customers/1
```

### POST /customers

Tạo khách hàng mới

```bash
curl -X POST http://localhost:8080/api/v1/customers \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Tran Thi B",
    "phone": "0912345678",
    "email": "tranb@email.com",
    "address": "123 Nguyen Hue, HCMC"
  }'
```

### PUT /customers/:id

Cập nhật khách hàng

```bash
curl -X PUT http://localhost:8080/api/v1/customers/1 \
  -H "Content-Type: application/json" \
  -d '{
    "address": "456 Le Loi, HCMC"
  }'
```

### DELETE /customers/:id

Xóa khách hàng

```bash
curl -X DELETE http://localhost:8080/api/v1/customers/1
```

---

## 6. Orders API

Entity `Order`:

- **orderId**: number
- **orderDate**: Date
- **customerId**: number
- **employeeId**: number
- **totalAmount**: number
- **customer**: `Customer`
- **employee**: `Employee`
- **orderDetails**: `OrderDetail[]`

### GET /orders

Lấy tất cả đơn hàng (bao gồm `customer`, `employee`, `orderDetails`)

```bash
curl http://localhost:8080/api/v1/orders
```

**Response Example:**

```json
[
  {
    "orderId": 1,
    "orderDate": "2025-11-25",
    "totalAmount": 25000000,
    "customerId": 1,
    "employeeId": 1,
    "customer": {
      "customerId": 1,
      "fullName": "Tran Thi B",
      "email": "tranb@email.com"
    },
    "employee": {
      "employeeId": 1,
      "fullName": "Nguyen Van A"
    },
    "orderDetails": [
      {
        "orderDetailId": 1,
        "orderId": 1,
        "variantId": 1,
        "quantity": 1,
        "unitPrice": 25000000
      }
    ]
  }
]
```

### GET /orders/:id

Lấy đơn hàng theo ID

```bash
curl http://localhost:8080/api/v1/orders/1
```

### POST /orders

Tạo đơn hàng mới

```bash
curl -X POST http://localhost:8080/api/v1/orders \
  -H "Content-Type: application/json" \
  -d '{
    "orderDate": "2025-11-25",
    "customerId": 1,
    "employeeId": 1,
    "totalAmount": 25000000
  }'
```

### PUT /orders/:id

Cập nhật đơn hàng

```bash
curl -X PUT http://localhost:8080/api/v1/orders/1 \
  -H "Content-Type: application/json" \
  -d '{
    "totalAmount": 26000000
  }'
```

### DELETE /orders/:id

Xóa đơn hàng

```bash
curl -X DELETE http://localhost:8080/api/v1/orders/1
```

---

## 7. Order Details API

Entity `OrderDetail`:

- **orderDetailId**: number
- **orderId**: number
- **variantId**: number
- **quantity**: number
- **unitPrice**: number
- **order**: `Order`
- **variant**: `ProductVariant` (kèm `product`)

### GET /order-details

Lấy tất cả chi tiết đơn hàng (bao gồm `order`, `variant`, `variant.product`)

```bash
curl http://localhost:8080/api/v1/order-details
```

**Response Example:**

```json
[
  {
    "orderDetailId": 1,
    "orderId": 1,
    "variantId": 1,
    "quantity": 2,
    "unitPrice": 25000000,
    "order": {
      "orderId": 1,
      "orderDate": "2025-11-25",
      "totalAmount": 50000000
    },
    "variant": {
      "variantId": 1,
      "productId": 1,
      "size": "128GB",
      "color": "Black",
      "stock": 20,
      "product": {
        "productId": 1,
        "productName": "iPhone 15 Pro",
        "categoryId": 1
      }
    }
  }
]
```

### GET /order-details/:id

Lấy chi tiết đơn hàng theo ID

```bash
curl http://localhost:8080/api/v1/order-details/1
```

### POST /order-details

Tạo chi tiết đơn hàng mới

```bash
curl -X POST http://localhost:8080/api/v1/order-details \
  -H "Content-Type: application/json" \
  -d '{
    "orderId": 1,
    "variantId": 1,
    "quantity": 2,
    "unitPrice": 25000000
  }'
```

### PUT /order-details/:id

Cập nhật chi tiết đơn hàng

```bash
curl -X PUT http://localhost:8080/api/v1/order-details/1 \
  -H "Content-Type: application/json" \
  -d '{
    "quantity": 3
  }'
```

### DELETE /order-details/:id

Xóa chi tiết đơn hàng

```bash
curl -X DELETE http://localhost:8080/api/v1/order-details/1
```

---

## 🚀 Quick Start

### 1. Start Server

```bash
yarn start:dev
```

Server chạy tại: `http://localhost:8080` (hoặc `http://localhost:${PORT}` nếu cấu hình khác).

### 2. Run Migrations

```bash
# Cleanup database
yarn db:cleanup

# Run migrations
yarn migration:run
```

### 3. Test API

```bash
# Test với curl (xem ví dụ bên trên)
# Hoặc dùng Postman/Insomnia
```

---

## 📁 Project Structure

```text
src/
├── modules/
│   ├── employees/
│   ├── customers/
│   ├── categories/
│   ├── products/
│   ├── product-variants/
│   ├── orders/
│   └── order-details/
├── config/
│   └── orm.config.ts
├── migrations/
└── app.module.ts
```

---

## 🔑 Key Features

✅ **Full CRUD operations** cho tất cả bảng chính (categories, products, product variants, employees, customers, orders, order details)  
✅ **TypeORM Relations** - Tự động load related data (products → category, variants; orders → customer, employee, orderDetails; orderDetails → variant → product)  
✅ **Migration support** - An toàn quản lý database schema  
✅ **Oracle Database** - Tương thích với Oracle 19c  
✅ **RESTful API** - Chuẩn REST với versioning (`/api/v1/...`)  
✅ **DTOs** - Validation và type safety

---

## 📊 Entity Relationships

```text
CATEGORIES (1)    ←─── (N) PRODUCTS (1) ←─── (N) PRODUCT_VARIANTS

CUSTOMERS (1) ──→ (N) ORDERS (N) ←─── (1) EMPLOYEES
                      ↑
                      │ (1)
                      │
                ORDER_DETAILS (N) ──→ (1) PRODUCT_VARIANTS ──→ (1) PRODUCTS
```

---

## 🛠️ Useful Commands

```bash
# Development
yarn start:dev          # Start with watch mode
yarn build              # Build production
yarn start:prod         # Run production build

# Database
yarn db:cleanup         # Drop all tables
yarn migration:create   # Create empty migration
yarn migration:generate # Generate migration from entities
yarn migration:run      # Run pending migrations
yarn migration:revert   # Rollback last migration

# Code Quality
yarn lint               # Run ESLint
yarn format             # Format code with Prettier
```
