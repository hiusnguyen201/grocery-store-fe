"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export type BreadcrumbItem = {
  title: string;
  link: string;
};

const routeMapping: Record<string, BreadcrumbItem[]> = {
  "/dashboard/overview": [
    {
      title: "Tổng quan",
      link: "/dashboard/overview",
    },
  ],
  "/dashboard/products": [
    {
      title: "Tổng quan",
      link: "/dashboard/overview",
    },
    {
      title: "Sản phẩm",
      link: "/dashboard/products",
    },
  ],
  "/dashboard/settings": [
    {
      title: "Tổng quan",
      link: "/dashboard/overview",
    },
    {
      title: "Cài đặt",
      link: "/dashboard/settings",
    },
  ],
};

export function useBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = useMemo(
    () => (routeMapping[pathname] ? routeMapping[pathname] : []),
    [pathname]
  );

  return breadcrumbs;
}
