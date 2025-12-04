# POS + Admin Panel - Complete Web Application

A full-featured Point of Sale (POS) system and Admin Panel built with Next.js 15, TypeScript, TailwindCSS, React Query, and Zustand.

## 🎯 Overview

This application provides a complete solution for managing a shoe store business with two main modules:

1. **POS (Point of Sale)** - Customer-facing sales interface
2. **Admin Panel** - Back-office management system

## 🚀 Features

### POS System (`/pos`)

- ✅ **Product Browsing** - Grid view with category filtering
- ✅ **Variant Selection** - Choose size, color, and quantity for each product
- ✅ **Shopping Cart** - Real-time cart with quantity adjustment
- ✅ **Customer Lookup** - Search existing customers or create new ones
- ✅ **Checkout** - Complete order creation with validation
- ✅ **Receipt Printing** - Professional printable receipts
- ✅ **Mobile Responsive** - Works on tablets and mobile devices

### Admin Panel

- ✅ **Dashboard** - Overview with statistics and recent orders
- ✅ **Products** - Full CRUD with variant management
- ✅ **Categories** - Organize products into categories
- ✅ **Customers** - Customer database management
- ✅ **Employees** - Staff management
- ✅ **Orders** - View all orders with detailed breakdowns
- ✅ **Order Details** - View items, variants, and totals

## 📂 Project Structure

```
src/
├── app/
│   ├── (dashboard)/          # Admin panel routes
│   │   ├── page.tsx          # Dashboard
│   │   ├── products/         # Product management
│   │   ├── categories/       # Category management
│   │   ├── customers/        # Customer management
│   │   ├── employees/        # Employee management
│   │   └── orders/           # Order management
│   │
│   └── pos/                  # POS routes
│       ├── page.tsx          # Main POS interface
│       ├── checkout/         # Checkout page
│       └── receipt/[id]/     # Receipt view
│
├── components/
│   ├── pos/                  # POS-specific components
│   │   ├── product-card.tsx
│   │   ├── variant-selector.tsx
│   │   ├── cart-sidebar.tsx
│   │   └── customer-lookup.tsx
│   │
│   ├── orders/               # Order components
│   │   ├── order-dialog.tsx
│   │   └── order-details-dialog.tsx
│   │
│   ├── products/             # Product components
│   │   └── product-dialog.tsx
│   │
│   └── ui/                   # Reusable UI components
│
├── lib/
│   ├── api/                  # API client functions
│   │   ├── products.ts
│   │   ├── categories.ts
│   │   ├── customers.ts
│   │   ├── employees.ts
│   │   ├── orders.ts
│   │   ├── product-variants.ts
│   │   └── order-details.ts
│   │
│   └── api-client.ts         # Axios instance
│
├── hooks/                    # React Query hooks
│   ├── use-products.ts
│   ├── use-categories.ts
│   ├── use-customers.ts
│   ├── use-employees.ts
│   └── use-orders.ts
│
├── stores/                   # Zustand stores
│   ├── cart-store.ts         # POS cart state
│   └── ui-store.ts
│
└── types/
    └── index.ts              # TypeScript definitions
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **State Management**:
  - Zustand (cart state)
  - React Query (server state)
- **HTTP Client**: Axios
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📦 Installation

```bash
# Clone the repository
cd oracle_fe

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

## 🔌 API Integration

The frontend connects to a backend API at `http://localhost:8080/api/v1` by default.

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

### API Endpoints Used

- `GET /categories` - List categories
- `GET /products` - List products with variants
- `GET /products/category/:id` - Products by category
- `POST /products` - Create product with variants
- `PUT /products/:id` - Update product with variants
- `GET /customers` - List customers
- `POST /customers` - Create customer
- `GET /employees` - List employees
- `GET /orders` - List orders with details
- `POST /orders` - Create order
- `POST /order-details` - Add items to order
- `GET /product-variants` - List product variants
- `POST /product-variants` - Create variant

## 🎨 Key Features Explained

### 1. Product Variants

Products can have multiple variants (size, color, stock):

```typescript
interface Product {
  productId: number;
  productName: string;
  price: number;
  variants?: ProductVariant[];
}

interface ProductVariant {
  variantId: number;
  size: string | null;
  color: string | null;
  stock: number;
}
```

### 2. Cart Management (Zustand)

The POS cart is managed with Zustand for optimal performance:

```typescript
// Add item to cart
addItem(product, variant, quantity);

// Update quantity
updateQuantity(variantId, newQuantity);

// Remove item
removeItem(variantId);

// Get totals
getTotalAmount();
getTotalItems();
```

### 3. Order Creation Flow

1. Browse products in POS
2. Select variants and add to cart
3. Proceed to checkout
4. Select/create customer
5. Create order (POST `/orders`)
6. Add order details (POST `/order-details` for each cart item)
7. View receipt

### 4. Server State with React Query

All data fetching uses React Query for caching and real-time updates:

```typescript
const { products, isLoading } = useProducts();
const { createProduct, updateProduct, deleteProduct } = useProducts();
```

## 📱 Pages & Routes

### POS Routes

- `/pos` - Main POS interface with product grid
- `/pos/checkout` - Checkout page with customer selection
- `/pos/receipt/[id]` - Printable receipt

### Admin Routes

- `/` - Dashboard with statistics
- `/products` - Product management with variants
- `/categories` - Category management
- `/customers` - Customer database
- `/employees` - Employee management
- `/orders` - Order history with details

## 🎯 Usage Guide

### Starting a Sale (POS)

1. Navigate to `/pos`
2. Browse products or filter by category
3. Click "Add to Cart" on a product
4. Select variant (size/color) and quantity
5. Review cart in right sidebar
6. Click "Proceed to Checkout"
7. Search for existing customer or create new
8. Complete the order
9. Print receipt

### Managing Products (Admin)

1. Go to `/products`
2. Click "Add Product"
3. Fill in product details
4. Add variants (size, color, stock)
5. Save product
6. Product appears in POS with all variants

### Viewing Order Details

1. Go to `/orders`
2. Click actions menu (⋮) on an order
3. Select "View Details"
4. See complete order breakdown with items and variants

## 🎨 UI Components

### Reusable Components

- **DataTable** - Sortable, filterable tables
- **Dialog** - Modal dialogs for forms
- **Button** - Multiple variants (default, outline, ghost)
- **Badge** - Status indicators
- **Card** - Content containers
- **Input** - Form inputs with validation
- **Select** - Dropdown selectors
- **Toast** - Notifications (Sonner)

### POS-Specific Components

- **ProductCard** - Product display with stock
- **VariantSelector** - Modal for choosing variants
- **CartSidebar** - Real-time cart with totals
- **CustomerLookup** - Search/create customer dialog

## 🔧 Development

### Running Locally

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Adding New Features

1. **New API endpoint**: Create function in `src/lib/api/`
2. **New React Query hook**: Create in `src/hooks/`
3. **New page**: Create in `src/app/`
4. **New component**: Create in `src/components/`
5. **New type**: Add to `src/types/index.ts`

## 📊 Database Schema

The backend uses the following entities:

- **CATEGORIES** - Product categories
- **PRODUCTS** - Products (FK → CATEGORIES)
- **PRODUCT_VARIANTS** - Variants (FK → PRODUCTS)
- **EMPLOYEES** - Staff members
- **CUSTOMERS** - Customer database
- **ORDERS** - Orders (FK → CUSTOMERS, EMPLOYEES)
- **ORDER_DETAILS** - Order items (FK → ORDERS, PRODUCT_VARIANTS)

## 🎉 Features Implemented

✅ Complete POS system with cart
✅ Product variant management
✅ Customer lookup and creation
✅ Order creation workflow
✅ Printable receipts
✅ Admin CRUD for all entities
✅ Order details view
✅ Real-time cart updates
✅ Mobile responsive design
✅ Loading and error states
✅ Type-safe API calls
✅ Form validation
✅ Toast notifications

## 🚀 Deployment

### Environment Variables for Production

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api/v1
```

### Build & Deploy

```bash
npm run build
npm start
```

Or deploy to Vercel/Netlify directly from your repository.

## 📝 Notes

- Default employee ID is set to `1` in checkout. Add employee selection if needed.
- Products without variants can still be managed but won't be sellable in POS.
- Receipt uses browser print dialog - customize with print CSS.
- Cart state persists during session but clears after order completion.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the Oracle Backend integration.

---

**Built with ❤️ using Next.js 15, TypeScript, and TailwindCSS**
