"use client"
import {
  Calendar,
  Home,
  LogOut,
  ShoppingCart,
  TableProperties,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard/admin",
    icon: Home,
  },
  {
    title: "Products",
    url: "/dashboard/admin/products",
    icon: Calendar,
  },
  {
    title: "Categories",
    url: "/dashboard/admin/categories",
    icon: TableProperties,
  },
  {
    title: "Orders",
    url: "/dashboard/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Users",
    url: "/dashboard/admin/users",
    icon: User,
  },
];

export function AppSidebar() {
  const path = usePathname();
  return (
    <Sidebar className="shadow-lg">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-2xl font-bold text-black mt-4">
            Shoppu Admin!
          </SidebarGroupLabel>
          <SidebarGroupContent className="pt-10">
            <SidebarMenu className="gap-3">
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mx-2 ">
                  <SidebarMenuButton asChild className={`py-5 ${item.url == path ? 'bg-blue-600 hover:bg-blue-800 text-white hover:text-white rounded-xl  ease-soft-spring transition-all duration-300' : ''}`}>
                    <Link href={item.url}>
                      <item.icon className="scale-125" />
                      <span className="ml-3 text-base font-bold">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton>
        <LogOut className="scale-110" />
          <Link className="ml-3 text-xl" href={"/"}>Exit</Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
