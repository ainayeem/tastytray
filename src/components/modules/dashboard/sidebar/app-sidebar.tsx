"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useUser } from "@/context/UserContext";
import { Frame, LayoutDashboard, LifeBuoy, Map, PieChart, Send } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const data = {
    navMain: [
      // {
      //   title: "Dashboard",
      //   url: "/user/dashboard",
      //   icon: SquareTerminal,
      //   isActive: true,
      // },
      {
        title: "Dashboard",
        url: `/dashboard/${user?.role}`,
        icon: LayoutDashboard,
        items: [
          {
            title: "Find Meals",
            url: "/find-meals",
          },
          {
            title: "Track Orders",
            url: `/dashboard/${user?.role}/track-order`,
          },
          {
            title: "Manage Brands",
            url: "/user/shop/brand",
          },
        ],
      },

      // {
      //   title: "Settings",
      //   url: "#",
      //   icon: Settings,
      //   items: [
      //     {
      //       title: "Profile",
      //       url: "/profile",
      //     },
      //   ],
      // },
    ],
    navSecondary: [
      {
        title: "Support",
        url: "#",
        icon: LifeBuoy,
      },
      {
        title: "Feedback",
        url: "#",
        icon: Send,
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center"></div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  {/* <p className="font-bold text-xl">TastyTray</p> */}
                  <p className="font-bold text-xl">
                    Tasty<span className="text-rose-600">Tray</span>
                  </p>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
