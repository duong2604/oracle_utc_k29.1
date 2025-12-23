"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ordersApi } from "@/lib/api/orders";
import { Order } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Printer, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function ReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderId = parseInt(id);
        const data = await ordersApi.getById(orderId);
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order:", error);
        toast.error("Failed to load order details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center space-y-4">
            <p className="text-muted-foreground">Order not found</p>
            <Button onClick={() => router.push("/pos")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to POS
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 p-4">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Header - Hidden on print */}
        <div className="flex items-center justify-between print:hidden">
          <Button variant="ghost" onClick={() => router.push("/pos")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            New Order
          </Button>
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Print Receipt
          </Button>
        </div>

        {/* Success Message - Hidden on print */}
        <Card className="bg-green-50 border-green-200 print:hidden">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 text-green-800">
              <CheckCircle className="h-8 w-8" />
              <div>
                <h3 className="font-semibold text-lg">Order Completed!</h3>
                <p className="text-sm">
                  Order #{order.orderId} has been created successfully
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Receipt */}
        <Card className="print:shadow-none print:border-none">
          <CardContent className="pt-6 space-y-6">
            {/* Store Header */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">Shoe Store</h1>
              <p className="text-sm text-muted-foreground">
                Point of Sale System
              </p>
              <p className="text-xs text-muted-foreground">
                123 Main Street, City, Country
              </p>
              <p className="text-xs text-muted-foreground">
                Phone: (123) 456-7890
              </p>
            </div>

            <Separator />

            {/* Order Info */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order #:</span>
                <span className="font-semibold">{order.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-medium">
                  {new Date(order.orderDate).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Customer:</span>
                <span className="font-medium">
                  {order.customer?.fullName || "Walk-in"}
                </span>
              </div>
              {order.customer?.phone && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Phone:</span>
                  <span className="font-medium">{order.customer.phone}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Cashier:</span>
                <span className="font-medium">
                  {order.employee?.fullName || "System"}
                </span>
              </div>
            </div>

            <Separator />

            {/* Order Items */}
            <div className="space-y-3">
              <h3 className="font-semibold">Items</h3>
              {order.orderDetails && order.orderDetails.length > 0 ? (
                <div className="space-y-3">
                  {order.orderDetails.map((detail) => (
                    <div
                      key={detail.orderDetailId}
                      className="space-y-1 text-sm"
                    >
                      <div className="flex justify-between font-medium">
                        <span>
                          {detail.variant?.product?.productName || "Product"}
                        </span>
                        <span>
                          $
                          {(
                            detail.unitPrice * detail.quantity
                          ).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-muted-foreground text-xs pl-4">
                        <div>
                          {detail.variant?.size && (
                            <span>Size: {detail.variant.size} </span>
                          )}
                          {detail.variant?.color && (
                            <span>• Color: {detail.variant.color}</span>
                          )}
                        </div>
                        <span>
                          {detail.quantity} × $
                          {detail.unitPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No items in this order
                </p>
              )}
            </div>

            <Separator />

            {/* Total */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal:</span>
                <span className="font-medium">
                  ${order.totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax:</span>
                <span className="font-medium">$0.00</span>
              </div>
              <Separator />
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>${order.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <Separator />

            {/* Footer */}
            <div className="text-center space-y-2 text-xs text-muted-foreground">
              <p>Thank you for your purchase!</p>
              <p>Please keep this receipt for your records</p>
              <p className="font-mono mt-4">{new Date().toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons - Hidden on print */}
        <div className="flex gap-2 print:hidden">
          <Button
            variant="outline"
            onClick={() => router.push("/pos")}
            className="flex-1"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            New Order
          </Button>
          <Button onClick={handlePrint} className="flex-1">
            <Printer className="mr-2 h-4 w-4" />
            Print Receipt
          </Button>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none !important;
          }
          @page {
            margin: 0.5in;
          }
        }
      `}</style>
    </div>
  );
}
