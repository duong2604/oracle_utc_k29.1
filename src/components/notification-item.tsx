"use client";

import { Bell } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NotificationItem() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="hover:cursor-pointer" variant="outline" size="icon">
          <Bell className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Bell className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="hover:cursor-pointer">
          Hello, You had a unread message...
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:cursor-pointer">
          Hello, You had a unread message...
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:cursor-pointer">
          Hello, You had a unread message...
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:cursor-pointer">
          Hello, You had a unread message...
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
