"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCategories } from "@/hooks/use-categories";
import { useProducts } from "@/hooks/use-products";
import { useEmployees } from "@/hooks/use-employees";
import { useCustomers } from "@/hooks/use-customers";
import { useOrders } from "@/hooks/use-orders";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Package,
  ShoppingCart,
  Users,
  UserCircle,
  FolderOpen,
  DollarSign,
} from "lucide-react";

export default function DashboardPage() {
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { products, isLoading: productsLoading } = useProducts();
  const { employees, isLoading: employeesLoading } = useEmployees();
  const { customers, isLoading: customersLoading } = useCustomers();
  const { orders, isLoading: ordersLoading } = useOrders();

  const isLoading =
    categoriesLoading ||
    productsLoading ||
    employeesLoading ||
    customersLoading ||
    ordersLoading;

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );
  const lowStockProducts = products.filter((p) => p.quantity < 10).length;

  const stats = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      description: `${lowStockProducts} low stock`,
      color: "text-blue-600",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingCart,
      description: "All time orders",
      color: "text-green-600",
    },
    {
      title: "Total Customers",
      value: customers.length,
      icon: Users,
      description: "Registered customers",
      color: "text-purple-600",
    },
    {
      title: "Total Employees",
      value: employees.length,
      icon: UserCircle,
      description: "Active employees",
      color: "text-orange-600",
    },
    {
      title: "Categories",
      value: categories.length,
      icon: FolderOpen,
      description: "Product categories",
      color: "text-pink-600",
    },
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      description: "All time revenue",
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome to your sales management system
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest 5 orders in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div
                      key={order.orderId}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm font-medium">
                          Order #{order.orderId}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.customer?.fullName || "Unknown Customer"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-green-600">
                          ${order.totalAmount.toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      No orders yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Low Stock Products</CardTitle>
                <CardDescription>
                  Products with quantity less than 10
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products
                    .filter((p) => p.quantity < 10)
                    .slice(0, 5)
                    .map((product) => (
                      <div
                        key={product.productId}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="text-sm font-medium">
                            {product.productName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.category?.categoryName || "No Category"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p
                            className={`text-sm font-bold ${
                              product.quantity === 0
                                ? "text-red-600"
                                : "text-orange-600"
                            }`}
                          >
                            Stock: {product.quantity}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ${product.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  {lowStockProducts === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4">
                      All products are well stocked
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
