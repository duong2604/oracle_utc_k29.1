# API Documentation - Oracle Backend

**Base URL:** `http://localhost:8888/api/v1`

## 📊 Database Schema

Hệ thống quản lý bán hàng với 6 bảng:

- **CATEGORIES** - Danh mục sản phẩm
- **PRODUCTS** - Sản phẩm (FK → CATEGORIES)
- **EMPLOYEES** - Nhân viên
- **CUSTOMERS** - Khách hàng
- **ORDERS** - Đơn hàng (FK → CUSTOMERS, EMPLOYEES)
- **ORDER_DETAILS** - Chi tiết đơn hàng (FK → ORDERS, PRODUCTS)

---

## 1. Categories API

### GET /categories

Lấy tất cả danh mục

```bash
curl http://localhost:8888/api/v1/categories
```

### GET /categories/:id

Lấy danh mục theo ID

```bash
curl http://localhost:8888/api/v1/categories/1
```

### POST /categories

Tạo danh mục mới

```bash
curl -X POST http://localhost:8888/api/v1/categories \
  -H "Content-Type: application/json" \
  -d '{
    "categoryName": "Electronics",
    "description": "Electronic devices"
  }'
```

### PUT /categories/:id

Cập nhật danh mục

```bash
curl -X PUT http://localhost:8888/api/v1/categories/1 \
  -H "Content-Type: application/json" \
  -d '{
    "categoryName": "Electronics Updated"
  }'
```

### DELETE /categories/:id

Xóa danh mục

```bash
curl -X DELETE http://localhost:8888/api/v1/categories/1
```

---

## 2. Products API

### GET /products

Lấy tất cả sản phẩm (bao gồm category relation)

```bash
curl http://localhost:8888/api/v1/products
```

### GET /products/:id

Lấy sản phẩm theo ID

```bash
curl http://localhost:8888/api/v1/products/1
```

### POST /products

Tạo sản phẩm mới

```bash
curl -X POST http://localhost:8888/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Laptop Dell XPS 13",
    "price": 25000000,
    "quantity": 10,
    "categoryId": 1
  }'
```

### PUT /products/:id

Cập nhật sản phẩm

```bash
curl -X PUT http://localhost:8888/api/v1/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 24000000,
    "quantity": 15
  }'
```

### DELETE /products/:id

Xóa sản phẩm

```bash
curl -X DELETE http://localhost:8888/api/v1/products/1
```

---

## 3. Employees API

### GET /employees

Lấy tất cả nhân viên

```bash
curl http://localhost:8888/api/v1/employees
```

### GET /employees/:id

Lấy nhân viên theo ID

```bash
curl http://localhost:8888/api/v1/employees/1
```

### POST /employees

Tạo nhân viên mới

```bash
curl -X POST http://localhost:8888/api/v1/employees \
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
curl -X PUT http://localhost:8888/api/v1/employees/1 \
  -H "Content-Type: application/json" \
  -d '{
    "salary": 16000000,
    "position": "Senior Sales Manager"
  }'
```

### DELETE /employees/:id

Xóa nhân viên

```bash
curl -X DELETE http://localhost:8888/api/v1/employees/1
```

---

## 4. Customers API

### GET /customers

Lấy tất cả khách hàng

```bash
curl http://localhost:8888/api/v1/customers
```

### GET /customers/:id

Lấy khách hàng theo ID

```bash
curl http://localhost:8888/api/v1/customers/1
```

### POST /customers

Tạo khách hàng mới

```bash
curl -X POST http://localhost:8888/api/v1/customers \
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
curl -X PUT http://localhost:8888/api/v1/customers/1 \
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

## 5. Orders API

### GET /orders

Lấy tất cả đơn hàng (bao gồm customer, employee, orderDetails relations)

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
        "productId": 1,
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

## 6. Order Details API

### GET /order-details

Lấy tất cả chi tiết đơn hàng (bao gồm order, product relations)

```bash
curl http://localhost:8080/api/v1/order-details
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
    "productId": 1,
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

Server chạy tại: `http://localhost:8080`

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

```
src/
├── modules/
│   ├── employees/
│   │   ├── dto/
│   │   │   ├── create-employee.dto.ts
│   │   │   └── update-employee.dto.ts
│   │   ├── employee.entity.ts
│   │   ├── employees.service.ts
│   │   ├── employees.controller.ts
│   │   └── employees.module.ts
│   ├── customers/
│   ├── categories/
│   ├── products/
│   ├── orders/
│   └── order-details/
├── config/
│   └── orm.config.ts
├── migrations/
└── app.module.ts
```

---

## 🔑 Key Features

✅ **Full CRUD operations** cho tất cả 6 bảng  
✅ **TypeORM Relations** - Tự động load related data  
✅ **Migration support** - An toàn quản lý database schema  
✅ **Oracle Database** - Tương thích với Oracle 19c  
✅ **RESTful API** - Chuẩn REST với versioning  
✅ **DTOs** - Validation và type safety

---

## 📊 Entity Relationships

```
CATEGORIES (1) ←─── (N) PRODUCTS
                           ↑
                           │ (N)
CUSTOMERS (1) ──→ (N) ORDERS (N) ←── (1) EMPLOYEES
                       ↑
                       │ (1)
                       │
                  ORDER_DETAILS (N) ──→ (1) PRODUCTS
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
