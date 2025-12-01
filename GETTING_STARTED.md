# 🚀 Getting Started Guide

## Quick Start

### 1. Start the Backend API

Make sure your Oracle backend is running on `http://localhost:8888`.

```bash
cd ../your-backend-folder
yarn start:dev
```

### 2. Start the Frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📍 Available Routes

| Route         | Description                        |
| ------------- | ---------------------------------- |
| `/`           | Dashboard with overview statistics |
| `/categories` | Manage product categories          |
| `/products`   | Manage products and inventory      |
| `/employees`  | Employee management                |
| `/customers`  | Customer database                  |
| `/orders`     | Order processing                   |

## 🎯 Common Tasks

### Adding a New Category

1. Navigate to **Categories** page (`/categories`)
2. Click **"Add Category"** button
3. Fill in:
   - Category Name (required)
   - Description (optional)
4. Click **"Create"**

### Adding a New Product

1. Navigate to **Products** page (`/products`)
2. Click **"Add Product"** button
3. Fill in:
   - Product Name (required)
   - Price (required, must be positive)
   - Quantity (required, must be positive)
   - Category (required, select from dropdown)
4. Click **"Create"**

### Creating an Order

1. Navigate to **Orders** page (`/orders`)
2. Click **"Create Order"** button
3. Fill in:
   - Order Date (required)
   - Customer (required, select from dropdown)
   - Employee (required, select from dropdown)
   - Total Amount (required)
4. Click **"Create"**

### Editing Records

1. Find the record in the table
2. Click the **three dots menu** (⋮) in the Actions column
3. Select **"Edit"**
4. Update the fields
5. Click **"Update"**

### Deleting Records

1. Find the record in the table
2. Click the **three dots menu** (⋮) in the Actions column
3. Select **"Delete"**
4. Confirm the deletion

### Searching Records

Use the search box above each table to filter records by name or ID.

### Pagination

Use **"Previous"** and **"Next"** buttons at the bottom of tables to navigate through pages.

## 🎨 UI Features

### Theme Toggle

- Click the **sun/moon icon** in the header to switch between light and dark mode
- Your preference is saved automatically

### Sidebar Navigation

- Click on any menu item to navigate
- Sidebar collapses on mobile devices
- Expandable sections for grouped items (Catalog, People)

### Data Tables

- **Search**: Filter records in real-time
- **Sort**: Click column headers to sort
- **Paginate**: Navigate through pages
- **Actions**: Edit or delete via dropdown menu

## 📊 Dashboard Overview

The dashboard (`/`) shows:

- **Total Products**: Number of products (shows low stock count)
- **Total Orders**: All-time order count
- **Total Customers**: Registered customers
- **Total Employees**: Active employees
- **Categories**: Product category count
- **Total Revenue**: Sum of all order amounts
- **Recent Orders**: Latest 5 orders
- **Low Stock Products**: Products with quantity < 10

## 🔧 Configuration

### Change API URL

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://your-api-url:port/api/v1
```

Then restart the dev server.

## 🐛 Troubleshooting

### "Failed to fetch" errors

**Problem**: Cannot connect to backend API

**Solutions**:

1. Ensure backend is running on `http://localhost:8888`
2. Check browser console for CORS errors
3. Verify API endpoints in `src/lib/api-client.ts`

### Empty dropdowns in forms

**Problem**: No options available when creating products/orders

**Solutions**:

1. First create Categories before adding Products
2. Create Customers and Employees before creating Orders
3. Ensure backend has data in related tables

### Data not updating after changes

**Problem**: Changes don't appear immediately

**Solutions**:

1. Check browser console for errors
2. Refresh the page (React Query cache may need update)
3. Verify backend successfully processed the request

### Build errors

**Problem**: `npm run build` fails

**Solutions**:

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules
npm install

# Try building again
npm run build
```

## 📱 Mobile Usage

The app is fully responsive:

- Sidebar converts to a hamburger menu
- Tables scroll horizontally on small screens
- Forms adapt to mobile layout
- Touch-friendly buttons and interactions

## 🎓 Tips & Best Practices

### Data Entry

1. Always create **Categories** before **Products**
2. Create **Customers** and **Employees** before **Orders**
3. Use descriptive names for easy searching
4. Keep product quantities updated

### Performance

- Tables are paginated automatically
- Search is client-side for fast results
- Data is cached by React Query
- Background refetching keeps data fresh

### Data Management

- Use search to find records quickly
- Sort by ID, name, or date as needed
- Review low stock products on dashboard
- Monitor recent orders for activity

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)

## 📞 Need Help?

- Check the main `README_CRUD.md` for technical details
- Review `API_DOCUMENTATION.md` for backend API reference
- Open an issue on GitHub for bugs or questions

---

Happy managing! 🎉
