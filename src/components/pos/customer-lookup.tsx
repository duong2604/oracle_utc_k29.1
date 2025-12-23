"use client";

import { useState } from "react";
import { Customer, CreateCustomerDto } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCustomers } from "@/hooks/use-customers";
import { Search, UserPlus, Check } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface CustomerLookupProps {
  open: boolean;
  onClose: () => void;
  onSelectCustomer: (customer: Customer) => void;
}

export function CustomerLookup({
  open,
  onClose,
  onSelectCustomer,
}: CustomerLookupProps) {
  const { customers, isLoading, createCustomer } = useCustomers();
  const [searchPhone, setSearchPhone] = useState("");
  const [newCustomer, setNewCustomer] = useState<CreateCustomerDto>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });
  const [isCreating, setIsCreating] = useState(false);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.phone.includes(searchPhone) ||
      customer.fullName.toLowerCase().includes(searchPhone.toLowerCase())
  );

  const handleSearchAndSelect = () => {
    if (!searchPhone) {
      toast.error("Please enter a phone number");
      return;
    }

    const found = customers.find((c) => c.phone === searchPhone);
    if (found) {
      onSelectCustomer(found);
      toast.success(`Customer found: ${found.fullName}`);
      handleClose();
    } else {
      toast.error("Customer not found. Please create a new customer.");
    }
  };

  const handleCreateCustomer = () => {
    if (!newCustomer.fullName || !newCustomer.phone) {
      toast.error("Full name and phone are required");
      return;
    }

    setIsCreating(true);
    createCustomer(newCustomer, {
      onSuccess: (created) => {
        onSelectCustomer(created);
        handleClose();
        setIsCreating(false);
      },
      onError: () => {
        setIsCreating(false);
      },
    });
  };

  const handleClose = () => {
    setSearchPhone("");
    setNewCustomer({
      fullName: "",
      phone: "",
      email: "",
      address: "",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customer Lookup</DialogTitle>
          <DialogDescription>
            Search for an existing customer or create a new one
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Search Customer</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search by Phone or Name</Label>
              <div className="flex gap-2">
                <Input
                  id="search"
                  placeholder="Enter phone number or name..."
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchAndSelect();
                    }
                  }}
                />
                <Button onClick={handleSearchAndSelect}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                <p className="text-sm text-muted-foreground mb-2">
                  {searchPhone
                    ? `${filteredCustomers.length} customer(s) found`
                    : `${customers.length} total customers`}
                </p>
                {(searchPhone ? filteredCustomers : customers).map(
                  (customer) => (
                    <button
                      key={customer.customerId}
                      onClick={() => {
                        onSelectCustomer(customer);
                        toast.success(`Selected: ${customer.fullName}`);
                        handleClose();
                      }}
                      className="w-full p-4 border rounded-lg text-left hover:border-primary hover:bg-primary/5 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{customer.fullName}</p>
                          <p className="text-sm text-muted-foreground">
                            {customer.phone}
                          </p>
                          {customer.email && (
                            <p className="text-xs text-muted-foreground">
                              {customer.email}
                            </p>
                          )}
                        </div>
                        <Check className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </button>
                  )
                )}
                {searchPhone && filteredCustomers.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No customers found. Try creating a new customer.
                  </p>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="Enter customer name"
                  value={newCustomer.fullName}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, fullName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  value={newCustomer.phone}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, phone: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={newCustomer.email}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, email: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  placeholder="Enter address"
                  value={newCustomer.address}
                  onChange={(e) =>
                    setNewCustomer({ ...newCustomer, address: e.target.value })
                  }
                />
              </div>

              <Button
                onClick={handleCreateCustomer}
                disabled={isCreating}
                className="w-full"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                {isCreating ? "Creating..." : "Create Customer"}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
