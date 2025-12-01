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
import { Textarea } from "@/components/ui/textarea";
import { useCustomers } from "@/hooks/use-customers";
import { Customer, CreateCustomerDto } from "@/types";

interface CustomerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  customer?: Customer;
}

export function CustomerDialog({
  isOpen,
  onClose,
  customer,
}: CustomerDialogProps) {
  const { createCustomer, updateCustomer, isCreating, isUpdating } =
    useCustomers();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCustomerDto>({
    defaultValues: customer,
  });

  useEffect(() => {
    if (customer) {
      reset(customer);
    } else {
      reset({ fullName: "", phone: "", email: "", address: "" });
    }
  }, [customer, reset]);

  const onSubmit = (data: CreateCustomerDto) => {
    if (customer) {
      updateCustomer(
        { id: customer.customerId, data },
        {
          onSuccess: () => {
            onClose();
            reset();
          },
        }
      );
    } else {
      createCustomer(data, {
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
          <DialogTitle>
            {customer ? "Edit Customer" : "Create Customer"}
          </DialogTitle>
          <DialogDescription>
            {customer
              ? "Update the customer information below."
              : "Add a new customer to your system."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Full Name *
              </Label>
              <Input
                id="fullName"
                placeholder="Enter customer full name..."
                className="placeholder:text-muted-foreground/60"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <p className="text-sm text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone *
                </Label>
                <Input
                  id="phone"
                  placeholder="e.g., 0901234567"
                  className="placeholder:text-muted-foreground/60"
                  {...register("phone", { required: "Phone is required" })}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="customer@example.com"
                  className="placeholder:text-muted-foreground/60"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="address" className="text-sm font-medium">
                Address *
              </Label>
              <Textarea
                id="address"
                placeholder="Enter full address (street, city, country)..."
                className="placeholder:text-muted-foreground/60 resize-none"
                rows={3}
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <p className="text-sm text-destructive">
                  {errors.address.message}
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
                : customer
                ? "Update"
                : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
