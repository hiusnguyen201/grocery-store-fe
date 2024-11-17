"use client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

import {
  GalleryVerticalEnd,
  LayoutDashboard,
  Package,
  Settings2,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { useCookies } from "next-client-cookies";

const data = {
  store: {
    name: "Acme Inc",
    logo: GalleryVerticalEnd,
    plan: "Enterprise",
  },
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/window.svg",
  },
  navMain: [
    {
      title: "Tổng quan",
      url: "/dashboard/overview",
      icon: LayoutDashboard,
    },
    {
      title: "Sản phẩm",
      url: "/dashboard/products",
      icon: Package,
    },
    {
      title: "Cài đặt",
      url: "/dashboard/settings",
      icon: Settings2,
    },
  ],
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = useCookies();
  return (
    <SidebarProvider
      defaultOpen={cookies.get("sidebar:state") === "false"}
    >
      <AppSidebar data={data} />
      <SidebarInset>
        <AppHeader />
        <div className="flex h-full flex-col p-4 md:px-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
