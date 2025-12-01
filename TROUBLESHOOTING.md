# 🔧 Troubleshooting Guide

## ❌ 500 Server Error when Creating Products

If you're seeing a **500 Server Error** when trying to create products, follow these steps:

### 1. Check if Backend is Running

Make sure your Oracle backend API is running on port **8080**:

```bash
# In your backend directory
yarn start:dev
# or
npm run start:dev
```

The server should be running at: `http://localhost:8080`

### 2. Verify API Endpoint

According to your `API_DOCUMENTATION.md`, the base URL should be:

- **Current setting**: `http://localhost:8080/api/v1`
- **Original docs**: `http://localhost:8888/api/v1`

If your backend is running on port **8888**, update `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8888/api/v1
```

Then restart the Next.js dev server:

```bash
npm run dev
```

### 3. Check Backend Database Connection

Ensure your Oracle database is:

- ✅ Running and accessible
- ✅ Migrations have been executed
- ✅ Tables are created

Run migrations if needed:

```bash
# In your backend directory
yarn db:cleanup
yarn migration:run
```

### 4. Test Backend API Directly

Test if the backend API is working with curl:

```bash
# Test GET categories
curl http://localhost:8080/api/v1/categories

# Test GET products
curl http://localhost:8080/api/v1/products

# Test POST product
curl -X POST http://localhost:8080/api/v1/products \
  -H "Content-Type: application/json" \
  -d '{
    "productName": "Test Product",
    "price": 99.99,
    "quantity": 10,
    "categoryId": 1
  }'
```

### 5. Check Browser Console

With the improved error logging, check your browser console for detailed error information:

```
❌ Server error: {
  url: "/products",
  method: "POST",
  data: {...},
  errorMessage: "...",
  errorDetails: {...}
}
```

### 6. Common Issues

#### Issue: "No categories available"

**Solution**: Create categories first before adding products.

```bash
# Create a category via API
curl -X POST http://localhost:8080/api/v1/categories \
  -H "Content-Type: application/json" \
  -d '{
    "categoryName": "Electronics",
    "description": "Electronic devices"
  }'
```

#### Issue: CORS Error

**Solution**: Ensure your backend has CORS enabled for `http://localhost:3000`

#### Issue: Connection Refused

**Solution**: Backend is not running. Start it with `yarn start:dev`

### 7. Debug Steps

1. **Open Browser DevTools** (F12)
2. Go to **Console** tab
3. Try creating a product
4. Look for error messages with 📤 (sending) and ❌ (error) emojis
5. Check the **Network** tab for the actual API request/response

### 8. Verify Data Format

The product data being sent should match this format:

```typescript
{
  productName: string,
  price: number,
  quantity: number,
  categoryId: number
}
```

### Need More Help?

1. Check backend logs for detailed error messages
2. Verify the backend API documentation matches the implementation
3. Ensure all required environment variables are set
4. Check if there are any database constraints or validation rules being violated

---

## ✅ Success Indicators

When everything is working correctly, you should see in the console:

```
📤 Submitting product data: {...}
✅ Product created successfully
```

And a success toast notification: "Product created successfully"
