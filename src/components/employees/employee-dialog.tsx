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
import { useEmployees } from "@/hooks/use-employees";
import { Employee, CreateEmployeeDto } from "@/types";

interface EmployeeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  employee?: Employee;
}

export function EmployeeDialog({
  isOpen,
  onClose,
  employee,
}: EmployeeDialogProps) {
  const { createEmployee, updateEmployee, isCreating, isUpdating } =
    useEmployees();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateEmployeeDto>({
    defaultValues: employee,
  });

  useEffect(() => {
    if (employee) {
      reset(employee);
    } else {
      reset({ fullName: "", phone: "", position: "", salary: 0, hireDate: "" });
    }
  }, [employee, reset]);

  const onSubmit = (data: CreateEmployeeDto) => {
    if (employee) {
      updateEmployee(
        { id: employee.employeeId, data },
        {
          onSuccess: () => {
            onClose();
            reset();
          },
        }
      );
    } else {
      createEmployee(data, {
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
            {employee ? "Edit Employee" : "Create Employee"}
          </DialogTitle>
          <DialogDescription>
            {employee
              ? "Update the employee information below."
              : "Add a new employee to your organization."}
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
                placeholder="Enter employee full name..."
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
                <Label htmlFor="position" className="text-sm font-medium">
                  Position *
                </Label>
                <Input
                  id="position"
                  placeholder="e.g., Sales Manager"
                  className="placeholder:text-muted-foreground/60"
                  {...register("position", {
                    required: "Position is required",
                  })}
                />
                {errors.position && (
                  <p className="text-sm text-destructive">
                    {errors.position.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="salary" className="text-sm font-medium">
                  Salary *
                </Label>
                <Input
                  id="salary"
                  type="number"
                  step="0.01"
                  placeholder="Enter salary amount..."
                  className="placeholder:text-muted-foreground/60"
                  {...register("salary", {
                    required: "Salary is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Salary must be positive" },
                  })}
                />
                {errors.salary && (
                  <p className="text-sm text-destructive">
                    {errors.salary.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="hireDate" className="text-sm font-medium">
                  Hire Date *
                </Label>
                <Input
                  id="hireDate"
                  type="date"
                  className="placeholder:text-muted-foreground/60"
                  {...register("hireDate", {
                    required: "Hire date is required",
                  })}
                />
                {errors.hireDate && (
                  <p className="text-sm text-destructive">
                    {errors.hireDate.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating || isUpdating}>
              {isCreating || isUpdating
                ? "Saving..."
                : employee
                ? "Update"
                : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
