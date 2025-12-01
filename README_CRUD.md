# Oracle Sales Management System - Frontend

A modern, full-featured Next.js admin dashboard for managing sales operations with Oracle Database backend.

## 🚀 Features

### ✅ Complete CRUD Operations

- **Products** - Full inventory management with category relations
- **Categories** - Organize products into categories
- **Employees** - Employee management with positions and salaries
- **Customers** - Customer database with contact information
- **Orders** - Order processing and tracking

### 🏗️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **React Query** - Powerful data fetching and caching
- **Zustand** - Lightweight state management
- **React Table** - Feature-rich tables with sorting, filtering, pagination
- **shadcn/ui** - Beautiful, accessible UI components
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client
- **React Hook Form** - Performant form validation

### 🎨 UI/UX Features

- 🌓 Dark/Light mode support
- 📱 Fully responsive design
- 🔍 Search and filter functionality
- 📊 Data tables with sorting and pagination
- 🎯 Real-time form validation
- 🔔 Toast notifications
- ⚡ Optimistic updates
- 🎭 Loading states and skeletons
- 🚨 Error handling

## 📁 Project Structure

```
src/
├── app/
│   ├── (dashboard)/          # Dashboard routes group
│   │   ├── page.tsx          # Dashboard home
│   │   ├── categories/       # Categories CRUD
│   │   ├── products/         # Products CRUD
│   │   ├── employees/        # Employees CRUD
│   │   ├── customers/        # Customers CRUD
│   │   └── orders/           # Orders CRUD
│   └── layout.tsx            # Root layout
├── components/
│   ├── categories/           # Category components
│   ├── products/             # Product components
│   ├── employees/            # Employee components
│   ├── customers/            # Customer components
│   ├── orders/               # Order components
│   └── ui/                   # Reusable UI components
├── hooks/                    # Custom React hooks
│   ├── use-categories.ts
│   ├── use-products.ts
│   ├── use-employees.ts
│   ├── use-customers.ts
│   └── use-orders.ts
├── lib/
│   ├── api/                  # API client functions
│   │   ├── categories.ts
│   │   ├── products.ts
│   │   ├── employees.ts
│   │   ├── customers.ts
│   │   └── orders.ts
│   ├── api-client.ts         # Axios configuration
│   └── utils.ts
├── stores/
│   └── ui-store.ts           # Zustand UI state
├── types/
│   └── index.ts              # TypeScript types
└── providers/
    ├── query-provider.tsx    # React Query setup
    └── theme-provider.tsx    # Theme management
```

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Oracle Backend API running on `http://localhost:8888`

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8888/api/v1
```

## 📖 Usage Guide

### Categories Management

Navigate to `/categories` to:

- ✅ View all categories in a data table
- ➕ Create new categories
- ✏️ Edit existing categories
- 🗑️ Delete categories
- 🔍 Search categories by name

### Products Management

Navigate to `/products` to:

- ✅ View all products with pricing and stock levels
- ➕ Create new products with category assignment
- ✏️ Update product details, prices, and quantities
- 🗑️ Remove products from inventory
- 🔍 Search products by name
- 🏷️ Filter by category

### Employees Management

Navigate to `/employees` to:

- ✅ View employee directory
- ➕ Add new employees
- ✏️ Update employee information
- 🗑️ Remove employees
- 💰 Manage salaries and positions
- 📅 Track hire dates

### Customers Management

Navigate to `/customers` to:

- ✅ View customer database
- ➕ Register new customers
- ✏️ Update customer information
- 🗑️ Delete customers
- 📧 Manage contact details

### Orders Management

Navigate to `/orders` to:

- ✅ View all orders
- ➕ Create new orders
- ✏️ Update order details
- 🗑️ Cancel orders
- 👤 Link customers and employees
- 💵 Track order amounts

## 🎯 Key Features Explained

### React Query Integration

- Automatic background refetching
- Cache management
- Optimistic updates
- Error retry logic
- Loading and error states

### Data Tables

- Client-side sorting
- Column filtering
- Pagination
- Search functionality
- Responsive design

### Form Validation

- Real-time validation with React Hook Form
- Custom error messages
- Type-safe form data
- Required field indicators

### State Management

- Global UI state with Zustand
- Server state with React Query
- Dialog/Modal state management
- Theme persistence

## 🔌 API Integration

All API calls are centralized in `src/lib/api/` with the following structure:

```typescript
// Example: Products API
export const productsApi = {
  getAll: () => Promise<Product[]>
  getById: (id) => Promise<Product>
  create: (data) => Promise<Product>
  update: (id, data) => Promise<Product>
  delete: (id) => Promise<void>
}
```

## 🎨 Theming

The app supports dark and light modes:

- Toggle via the theme switcher in the header
- Persisted in localStorage
- Respects system preferences

## 📱 Responsive Design

- Mobile-first approach
- Collapsible sidebar
- Touch-friendly interactions
- Optimized for all screen sizes

## 🚧 Future Enhancements

- [ ] Order details CRUD
- [ ] Advanced filtering and sorting
- [ ] Export data to CSV/Excel
- [ ] Print functionality
- [ ] Bulk operations
- [ ] User authentication
- [ ] Role-based permissions
- [ ] Analytics dashboard
- [ ] Real-time updates with WebSocket

## 🐛 Troubleshooting

### API Connection Issues

- Ensure backend is running on `http://localhost:8888`
- Check CORS settings
- Verify API endpoint URLs

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Delete `node_modules` and reinstall
- Check Node.js version compatibility

## 📝 License

MIT License

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js, React Query, and shadcn/ui
