"use client";

import {
  AudioWaveform,
  Command,
  Frame,
  GalleryVerticalEnd,
  Layers2,
  LayoutDashboard,
  PieChart,
  ShoppingBag,
  Users,
  Store,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavProjects } from "./nav-project";
import { TeamSwitcher } from "./team-switcher";

// This is sample data.
const data = {
  user: {
    name: "Admin User",
    email: "admin@oracle.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Oracle Sales",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Oracle Sales",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Oracle Sales",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "POS System",
      url: "/pos",
      icon: Store,
      items: [],
    },
    {
      title: "Catalog",
      url: "#",
      icon: Layers2,
      items: [
        {
          title: "Products",
          url: "/products",
        },
        {
          title: "Categories",
          url: "/categories",
        },
      ],
    },
    {
      title: "People",
      url: "#",
      icon: Users,
      items: [
        {
          title: "Customers",
          url: "/customers",
        },
        {
          title: "Employees",
          url: "/employees",
        },
      ],
    },
    {
      title: "Orders",
      url: "/orders",
      icon: ShoppingBag,
      items: [],
    },
  ],
  projects: [
    {
      name: "Settings",
      url: "#",
      icon: Frame,
    },
    {
      name: "Online Store",
      url: "#",
      icon: PieChart,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
