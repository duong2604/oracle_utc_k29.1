"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const items = [
  { label: "English", value: "en" },
  { label: "Viet Nam", value: "vn" },
  { label: "Japan", value: "jp" },
];

export default function LanguageItem() {
  const [lang, setLang] = React.useState<{ label: string; value: string }>(
    items[0]
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-[100px]" asChild>
        <Button className="hover:cursor-pointer" variant="outline" size="icon">
          {lang.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {items.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className="hover:cursor-pointer"
            onClick={() => setLang(item)}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
