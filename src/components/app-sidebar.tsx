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
  UserLock,
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
    name: "Footprint",
    email: "support@Footprint.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Footprint Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Footprint Inc",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Footprint Inc",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [],
    },
    {
      title: "Catalog",
      url: "#",
      icon: Layers2,
      items: [
        {
          title: "Products",
          url: "#",
        },
        {
          title: "Categories",
          url: "#",
        },
        {
          title: "Attributes",
          url: "#",
        },
        {
          title: "Coupon",
          url: "#",
        },
      ],
    },
    {
      title: "Customers",
      url: "#",
      icon: UserLock,
      items: [],
    },
    {
      title: "Orders",
      url: "#",
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
