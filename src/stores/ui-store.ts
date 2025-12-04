import { create } from "zustand";

interface DialogState {
  isOpen: boolean;
  title: string;
  mode: "create" | "edit" | "view";
  data?: unknown;
}

interface UIStore {
  // Dialog state
  categoryDialog: DialogState;
  productDialog: DialogState;
  employeeDialog: DialogState;
  customerDialog: DialogState;
  orderDialog: DialogState;

  // Dialog actions
  openCategoryDialog: (
    mode: "create" | "edit" | "view",
    data?: unknown
  ) => void;
  closeCategoryDialog: () => void;

  openProductDialog: (mode: "create" | "edit" | "view", data?: unknown) => void;
  closeProductDialog: () => void;

  openEmployeeDialog: (
    mode: "create" | "edit" | "view",
    data?: unknown
  ) => void;
  closeEmployeeDialog: () => void;

  openCustomerDialog: (
    mode: "create" | "edit" | "view",
    data?: unknown
  ) => void;
  closeCustomerDialog: () => void;

  openOrderDialog: (mode: "create" | "edit" | "view", data?: unknown) => void;
  closeOrderDialog: () => void;
}

const initialDialogState: DialogState = {
  isOpen: false,
  title: "",
  mode: "create",
  data: undefined,
};

export const useUIStore = create<UIStore>((set) => ({
  // Initial states
  categoryDialog: initialDialogState,
  productDialog: initialDialogState,
  employeeDialog: initialDialogState,
  customerDialog: initialDialogState,
  orderDialog: initialDialogState,

  // Category dialog actions
  openCategoryDialog: (mode, data) =>
    set({
      categoryDialog: {
        isOpen: true,
        title:
          mode === "create"
            ? "Create Category"
            : mode === "edit"
            ? "Edit Category"
            : "View Category",
        mode,
        data,
      },
    }),
  closeCategoryDialog: () => set({ categoryDialog: initialDialogState }),

  // Product dialog actions
  openProductDialog: (mode, data) =>
    set({
      productDialog: {
        isOpen: true,
        title:
          mode === "create"
            ? "Create Product"
            : mode === "edit"
            ? "Edit Product"
            : "View Product",
        mode,
        data,
      },
    }),
  closeProductDialog: () => set({ productDialog: initialDialogState }),

  // Employee dialog actions
  openEmployeeDialog: (mode, data) =>
    set({
      employeeDialog: {
        isOpen: true,
        title:
          mode === "create"
            ? "Create Employee"
            : mode === "edit"
            ? "Edit Employee"
            : "View Employee",
        mode,
        data,
      },
    }),
  closeEmployeeDialog: () => set({ employeeDialog: initialDialogState }),

  // Customer dialog actions
  openCustomerDialog: (mode, data) =>
    set({
      customerDialog: {
        isOpen: true,
        title:
          mode === "create"
            ? "Create Customer"
            : mode === "edit"
            ? "Edit Customer"
            : "View Customer",
        mode,
        data,
      },
    }),
  closeCustomerDialog: () => set({ customerDialog: initialDialogState }),

  // Order dialog actions
  openOrderDialog: (mode, data) =>
    set({
      orderDialog: {
        isOpen: true,
        title:
          mode === "create"
            ? "Create Order"
            : mode === "edit"
            ? "Edit Order"
            : "View Order",
        mode,
        data,
      },
    }),
  closeOrderDialog: () => set({ orderDialog: initialDialogState }),
}));
