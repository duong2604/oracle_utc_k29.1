"use client";

import { Order } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Package, User, UserCircle, Calendar, DollarSign } from "lucide-react";

interface OrderDetailsDialogProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

export function OrderDetailsDialog({
  order,
  open,
  onClose,
}: OrderDetailsDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Order Details</DialogTitle>
          <DialogDescription>
            Complete information for Order #{order.orderId}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Information */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Order Date</p>
                  <p className="font-medium">
                    {format(new Date(order.orderDate), "PPP")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Customer</p>
                  <p className="font-medium">
                    {order.customer?.fullName || "Unknown"}
                  </p>
                  {order.customer?.phone && (
                    <p className="text-xs text-muted-foreground">
                      {order.customer.phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <UserCircle className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Employee</p>
                  <p className="font-medium">
                    {order.employee?.fullName || "Unknown"}
                  </p>
                  {order.employee?.position && (
                    <p className="text-xs text-muted-foreground">
                      {order.employee.position}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Amount</p>
                  <p className="font-bold text-xl text-green-600">
                    ${order.totalAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              <h3 className="font-semibold text-lg">Order Items</h3>
              {order.orderDetails && (
                <Badge variant="secondary">
                  {order.orderDetails.length} item(s)
                </Badge>
              )}
            </div>

            {order.orderDetails && order.orderDetails.length > 0 ? (
              <div className="space-y-3">
                {order.orderDetails.map((detail) => (
                  <div
                    key={detail.orderDetailId}
                    className="p-4 border rounded-lg bg-muted/30"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="font-semibold">
                          {detail.variant?.product?.productName || "Product"}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          {detail.variant?.size && (
                            <Badge variant="outline" className="text-xs">
                              Size: {detail.variant.size}
                            </Badge>
                          )}
                          {detail.variant?.color && (
                            <Badge variant="outline" className="text-xs">
                              Color: {detail.variant.color}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                          Quantity: {detail.quantity} × $
                          {detail.unitPrice.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">
                          $
                          {(
                            detail.quantity * detail.unitPrice
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">
                No items in this order
              </p>
            )}
          </div>

          {order.orderDetails && order.orderDetails.length > 0 && (
            <>
              <Separator />
              <div className="space-y-2 bg-primary/5 p-4 rounded-lg">
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
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">
                    ${order.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
