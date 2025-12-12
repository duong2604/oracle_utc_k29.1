"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/stores/cart-store";
import { Customer } from "@/types";
import { CustomerLookup } from "@/components/pos/customer-lookup";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, User, ShoppingBag, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { ordersApi } from "@/lib/api/orders";
import { orderDetailsApi } from "@/lib/api/order-details";
import { Badge } from "@/components/ui/badge";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalAmount, clearCart } = useCartStore();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null
  );
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const totalAmount = getTotalAmount();

  const handleProcessOrder = async () => {
    if (!selectedCustomer) {
      toast.error("Please select a customer");
      return;
    }

    if (items.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Create the order
      const order = await ordersApi.create({
        orderDate: new Date().toISOString().split("T")[0],
        customerId: selectedCustomer.customerId,
        employeeId: 1, // Default employee ID - you can add employee selection
        totalAmount: totalAmount,
      });

      // Step 2: Create order details for each cart item
      const orderDetailPromises = items.map((item) =>
        orderDetailsApi.create({
          orderId: order.orderId,
          variantId: item.variant.variantId,
          quantity: item.quantity,
          unitPrice: item.product.price,
        })
      );

      await Promise.all(orderDetailPromises);

      toast.success("Order created successfully!");

      // Clear cart and navigate to receipt
      clearCart();
      router.push(`/pos/receipt/${order.orderId}`);
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error("Failed to create order. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="text-2xl font-bold">Cart is Empty</h2>
            <p className="text-muted-foreground">
              Add some products to your cart before checking out
            </p>
            <Button onClick={() => router.push("/pos")} className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/pos")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
          <h1 className="text-3xl font-bold">Checkout</h1>
          <div className="w-32" /> {/* Spacer for centering */}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Customer Selection */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedCustomer ? (
                <div className="p-4 border rounded-lg bg-primary/5 border-primary">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-lg">
                        {selectedCustomer.fullName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {selectedCustomer.phone}
                      </p>  
                      {selectedCustomer.email && (
                        <p className="text-sm text-muted-foreground">
                          {selectedCustomer.email}
                        </p>
                      )}
                      {selectedCustomer.address && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {selectedCustomer.address}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCustomerDialogOpen(true)}
                    >
                      Change
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  onClick={() => setCustomerDialogOpen(true)}
                  className="w-full"
                  size="lg"
                >
                  <User className="mr-2 h-5 w-5" />
                  Select Customer
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                Order Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items</span>
                  <span className="font-medium">{items.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">
                    ${totalAmount.toLocaleString()}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary">
                    ${totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleProcessOrder}
                disabled={!selectedCustomer || isProcessing}
                className="w-full"
                size="lg"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                {isProcessing ? "Processing..." : "Complete Order"}
              </Button>
            </CardContent>
          </Card>

          {/* Cart Items */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Cart Items ({items.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.variant.variantId}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{item.product.productName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        {item.variant.size && (
                          <Badge variant="outline" className="text-xs">
                            {item.variant.size}
                          </Badge>
                        )}
                        {item.variant.color && (
                          <Badge variant="outline" className="text-xs">
                            {item.variant.color}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} × ${item.product.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Customer Lookup Dialog */}
      <CustomerLookup
        open={customerDialogOpen}
        onClose={() => setCustomerDialogOpen(false)}
        onSelectCustomer={(customer: Customer) => {
          setSelectedCustomer(customer);
          setCustomerDialogOpen(false);
        }}
      />
    </div>
  );
}
