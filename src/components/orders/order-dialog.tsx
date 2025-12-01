"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOrders } from "@/hooks/use-orders";
import { useCustomers } from "@/hooks/use-customers";
import { useEmployees } from "@/hooks/use-employees";
import { Order, CreateOrderDto } from "@/types";

interface OrderDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order?: Order;
}

export function OrderDialog({ isOpen, onClose, order }: OrderDialogProps) {
  const { createOrder, updateOrder, isCreating, isUpdating } = useOrders();
  const { customers } = useCustomers();
  const { employees } = useEmployees();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateOrderDto>({
    defaultValues: order,
  });

  const customerId = watch("customerId");
  const employeeId = watch("employeeId");

  useEffect(() => {
    if (order) {
      reset(order);
    } else {
      const today = new Date().toISOString().split("T")[0];
      reset({ orderDate: today, customerId: 0, employeeId: 0, totalAmount: 0 });
    }
  }, [order, reset]);

  const onSubmit = (data: CreateOrderDto) => {
    if (order) {
      updateOrder(
        { id: order.orderId, data },
        {
          onSuccess: () => {
            onClose();
            reset();
          },
        }
      );
    } else {
      createOrder(data, {
        onSuccess: () => {
          onClose();
          reset();
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{order ? "Edit Order" : "Create Order"}</DialogTitle>
          <DialogDescription>
            {order
              ? "Update the order information below."
              : "Create a new order in your system."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="orderDate" className="text-sm font-medium">
                Order Date *
              </Label>
              <Input
                id="orderDate"
                type="date"
                className="placeholder:text-muted-foreground/60"
                {...register("orderDate", {
                  required: "Order date is required",
                })}
              />
              {errors.orderDate && (
                <p className="text-sm text-destructive">
                  {errors.orderDate.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="customerId" className="text-sm font-medium">
                Customer *
              </Label>
              <Select
                value={customerId?.toString()}
                onValueChange={(value) =>
                  setValue("customerId", parseInt(value))
                }
              >
                <SelectTrigger className="placeholder:text-muted-foreground/60">
                  <SelectValue placeholder="Choose customer for this order..." />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem
                      key={customer.customerId}
                      value={customer.customerId.toString()}
                    >
                      {customer.fullName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.customerId && (
                <p className="text-sm text-destructive">
                  {errors.customerId.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="employeeId" className="text-sm font-medium">
                Employee *
              </Label>
              <Select
                value={employeeId?.toString()}
                onValueChange={(value) =>
                  setValue("employeeId", parseInt(value))
                }
              >
                <SelectTrigger className="placeholder:text-muted-foreground/60">
                  <SelectValue placeholder="Assign employee to handle order..." />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((employee) => (
                    <SelectItem
                      key={employee.employeeId}
                      value={employee.employeeId.toString()}
                    >
                      {employee.fullName} - {employee.position}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.employeeId && (
                <p className="text-sm text-destructive">
                  {errors.employeeId.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="totalAmount" className="text-sm font-medium">
                Total Amount *
              </Label>
              <Input
                id="totalAmount"
                type="number"
                step="0.01"
                placeholder="Enter order total amount..."
                className="placeholder:text-muted-foreground/60"
                {...register("totalAmount", {
                  required: "Total amount is required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Amount must be positive" },
                })}
              />
              {errors.totalAmount && (
                <p className="text-sm text-destructive">
                  {errors.totalAmount.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating
                ? "Saving..."
                : order
                ? "Update"
                : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
