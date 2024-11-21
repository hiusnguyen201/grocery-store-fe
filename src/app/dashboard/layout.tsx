"use client";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

import {
  GalleryVerticalEnd,
  LayoutDashboard,
  Package,
  Settings2,
} from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { useCookies } from "next-client-cookies";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookies = useCookies();
  const t = useTranslations("Dashboard.Navbar");

  const data = useMemo(
    () => ({
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
          title: t("dashboard"),
          url: "/dashboard/overview",
          icon: LayoutDashboard,
        },
        {
          title: t("products"),
          url: "/dashboard/products",
          icon: Package,
        },
        {
          title: t("settings"),
          url: "/dashboard/settings",
          icon: Settings2,
        },
      ],
    }),
    [t]
  );

  return (
    <SidebarProvider
      defaultOpen={JSON.parse(cookies.get("sidebar:state") as string)}
    >
      <AppSidebar data={data} />
      <SidebarInset>
        <AppHeader />
        <div className="relative h-full p-4 md:px-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
