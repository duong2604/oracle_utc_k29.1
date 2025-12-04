# Quick Start Guide - POS + Admin Panel

## 🚀 Get Started in 5 Minutes

### Prerequisites

- Node.js 18+ installed
- Backend API running on `http://localhost:8080`
- npm or yarn package manager

### Step 1: Install Dependencies

```bash
cd oracle_fe
npm install
```

### Step 2: Configure Environment

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

### Step 3: Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📍 Key URLs

- **Dashboard**: http://localhost:3000
- **POS System**: http://localhost:3000/pos
- **Products**: http://localhost:3000/products
- **Orders**: http://localhost:3000/orders
- **Customers**: http://localhost:3000/customers

## 🎯 First Steps

### 1. Add Categories (Required)

1. Go to **Dashboard** → **Categories** (sidebar)
2. Click "Add Category"
3. Add categories like:
   - Men's Shoes
   - Women's Shoes
   - Sports Shoes
   - Casual Shoes

### 2. Add Products with Variants

1. Go to **Products**
2. Click "Add Product"
3. Fill in:
   - Product Name: "Nike Air Max 2024"
   - Price: 129.99
   - Quantity: 50
   - Category: Sports Shoes
4. Add Variants:
   - Size: 8, Color: Black, Stock: 10
   - Size: 9, Color: Black, Stock: 15
   - Size: 8, Color: White, Stock: 12
   - Size: 9, Color: White, Stock: 13
5. Click "Create"

### 3. Add Customers

1. Go to **Customers**
2. Click "Add Customer"
3. Fill in customer details
4. Click "Create"

### 4. Make Your First Sale

1. Go to **POS System** (sidebar or `/pos`)
2. Browse products
3. Click "Add to Cart" on a product
4. Select variant (size/color) and quantity
5. Click "Add to Cart"
6. Review cart on right sidebar
7. Click "Proceed to Checkout"
8. Select a customer (or create new)
9. Click "Complete Order"
10. View/print receipt

## 🎨 Navigation Guide

### Admin Panel Layout

```
┌─────────────────────────────────────┐
│ Sidebar  │   Main Content Area      │
│          │                           │
│ 🏠 Dashboard                        │
│ 🏪 POS System                       │
│ 📦 Catalog                          │
│   - Products                        │
│   - Categories                      │
│ 👥 People                           │
│   - Customers                       │
│   - Employees                       │
│ 🛒 Orders                           │
└─────────────────────────────────────┘
```

### POS Layout

```
┌──────────────────────────────────────────────────┐
│ [Search] [Category Filters]                     │
├───────────────────────────┬──────────────────────┤
│ Product Grid              │   Shopping Cart      │
│ ┌──────┐ ┌──────┐        │   ┌──────────────┐  │
│ │Product│ │Product│        │   │ Item 1      │  │
│ │ Card  │ │ Card  │        │   │ Item 2      │  │
│ └──────┘ └──────┘        │   └──────────────┘  │
│ ┌──────┐ ┌──────┐        │   Total: $XXX       │
│ │Product│ │Product│        │   [Checkout]        │
│ │ Card  │ │ Card  │        │                     │
│ └──────┘ └──────┘        │                     │
└───────────────────────────┴──────────────────────┘
```

## 🔍 Common Tasks

### View Order Details

1. Go to **Orders**
2. Click the menu (⋮) next to an order
3. Select "View Details"
4. See complete breakdown

### Edit Product Variants

1. Go to **Products**
2. Click edit (pencil icon) on a product
3. Modify variants in the dialog
4. Click "Update"

### Search Customer in POS

1. At checkout, click "Select Customer"
2. Switch to "Search Customer" tab
3. Enter phone number or name
4. Click on customer to select

### Create New Customer in POS

1. At checkout, click "Select Customer"
2. Switch to "Create New" tab
3. Fill in customer details
4. Click "Create Customer"

## ⚙️ Configuration

### Change API URL

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://your-api-url/api/v1
```

### Customize Theme

The app uses TailwindCSS. Edit `src/app/globals.css` to customize colors and theme.

## 🐛 Troubleshooting

### Products not showing in POS?

- Ensure products have variants added
- Check that product has stock available
- Verify category is assigned

### Can't create order?

- Make sure customer is selected
- Verify cart has items
- Check backend API is running
- Ensure variants have stock > 0

### API Connection Error?

```bash
# Check if backend is running
curl http://localhost:8080/api/v1/products

# Verify .env.local has correct URL
cat .env.local
```

### Cart not persisting?

- Cart clears after order completion (by design)
- Cart state is session-based
- Check browser console for errors

## 📊 Sample Data Workflow

### Complete Setup Example

```bash
# 1. Categories
POST /categories
{
  "categoryName": "Men's Shoes",
  "description": "Footwear for men"
}

# 2. Products with Variants
POST /products
{
  "productName": "Classic Leather Boots",
  "price": 89.99,
  "quantity": 50,
  "categoryId": 1,
  "variants": [
    { "size": "9", "color": "Brown", "stock": 15 },
    { "size": "10", "color": "Brown", "stock": 20 },
    { "size": "9", "color": "Black", "stock": 15 }
  ]
}

# 3. Customer
POST /customers
{
  "fullName": "John Doe",
  "phone": "555-0100",
  "email": "john@example.com",
  "address": "123 Main St"
}

# 4. Create Order (via POS)
POST /orders
{
  "orderDate": "2024-12-04",
  "customerId": 1,
  "employeeId": 1,
  "totalAmount": 179.98
}

# 5. Add Order Details
POST /order-details
{
  "orderId": 1,
  "variantId": 1,
  "quantity": 2,
  "unitPrice": 89.99
}
```

## 🎓 Learning Resources

- **API Documentation**: See `API_DOCUMENTATION.md`
- **API Testing**: See `API_TEST_GUIDE.md`
- **Full README**: See `POS_README.md`
- **Project Summary**: See `PROJECT_SUMMARY.md`

## 💡 Pro Tips

1. **Keyboard Shortcuts**: Press Enter in search to filter
2. **Bulk Operations**: Use data table sorting and filtering
3. **Print Receipts**: Receipt page has print-optimized layout
4. **Mobile POS**: POS works on tablets for counter use
5. **Category Filter**: Click "All" to see all products

## 🚀 Next Steps

1. ✅ Set up categories
2. ✅ Add products with variants
3. ✅ Add customers
4. ✅ Make test sales in POS
5. ✅ View orders in admin
6. 🎯 Customize theme
7. 🎯 Add more employees
8. 🎯 Generate reports (future)

## 📞 Support

- Check console for errors (F12)
- Verify API endpoints in Network tab
- Review `TROUBLESHOOTING.md`
- Check backend logs

---

**Ready to sell shoes! 👟**
