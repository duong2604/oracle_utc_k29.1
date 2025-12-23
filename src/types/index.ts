// Category Types
export interface Category {
  categoryId: number;
  categoryName: string;
  description?: string;
}

export interface CreateCategoryDto {
  categoryName: string;
  description?: string;
}

export interface UpdateCategoryDto {
  categoryName?: string;
  description?: string;
}

// Product Variant Types
export interface ProductVariant {
  variantId: number;
  productId: number;
  size: string | null;
  color: string | null;
  stock: number;
  product?: Product;
}

export interface CreateProductVariantDto {
  productId: number;
  size?: string | null;
  color?: string | null;
  stock: number;
}

export interface UpdateProductVariantDto {
  size?: string | null;
  color?: string | null;
  stock?: number;
}

// Product Types
export interface Product {
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  categoryId: number;
  category?: Category;
  variants?: ProductVariant[];
}

export interface CreateProductDto {
  productName: string;
  price: number;
  quantity: number;
  categoryId: number;
  variants?: Array<{
    size?: string | null;
    color?: string | null;
    stock: number;
  }>;
}

export interface UpdateProductDto {
  productName?: string;
  price?: number;
  quantity?: number;
  categoryId?: number;
  variants?: Array<{
    size?: string | null;
    color?: string | null;
    stock: number;
  }>;
}

// Employee Types
export interface Employee {
  employeeId: number;
  fullName: string;
  phone: string;
  position: string;
  salary: number;
  hireDate: string;
}

export interface CreateEmployeeDto {
  fullName: string;
  phone: string;
  position: string;
  salary: number;
  hireDate: string;
}

export interface UpdateEmployeeDto {
  fullName?: string;
  phone?: string;
  position?: string;
  salary?: number;
  hireDate?: string;
}

// Customer Types
export interface Customer {
  customerId: number;
  fullName: string;
  phone: string;
  email: string;
  address: string;
}

export interface CreateCustomerDto {
  fullName: string;
  phone: string;
  email: string;
  address: string;
}

export interface UpdateCustomerDto {
  fullName?: string;
  phone?: string;
  email?: string;
  address?: string;
}

// Order Types
export interface Order {
  orderId: number;
  orderDate: string;
  customerId: number;
  employeeId: number;
  totalAmount: number;
  customer?: Customer;
  employee?: Employee;
  orderDetails?: OrderDetail[];
}

export interface CreateOrderDto {
  orderDate: string;
  customerId: number;
  employeeId: number;
  totalAmount: number;
}

export interface UpdateOrderDto {
  orderDate?: string;
  customerId?: number;
  employeeId?: number;
  totalAmount?: number;
}

// Order Detail Types
export interface OrderDetail {
  orderDetailId: number;
  orderId: number;
  variantId: number;
  quantity: number;
  unitPrice: number;
  order?: Order;
  variant?: ProductVariant;
}

export interface CreateOrderDetailDto {
  orderId: number;
  variantId: number;
  quantity: number;
  unitPrice: number;
}

export interface UpdateOrderDetailDto {
  orderId?: number;
  variantId?: number;
  quantity?: number;
  unitPrice?: number;
}

// POS Cart Types
export interface CartItem {
  variant: ProductVariant;
  product: Product;
  quantity: number;
}
