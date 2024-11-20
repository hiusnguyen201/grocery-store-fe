"use client";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export type BreadcrumbItem = {
  title: string;
  link: string;
};

export function useBreadcrumbs() {
  const pathname = usePathname();
  const t = useTranslations("Dashboard.Navbar");

  const routeMapping: Record<string, BreadcrumbItem[]> = useMemo(
    () => ({
      "/dashboard/overview": [
        {
          title: t("overview"),
          link: "/dashboard/overview",
        },
      ],
      "/dashboard/products": [
        {
          title: t("overview"),
          link: "/dashboard/overview",
        },
        {
          title: t("products"),
          link: "/dashboard/products",
        },
      ],
      "/dashboard/settings": [
        {
          title: t("overview"),
          link: "/dashboard/overview",
        },
        {
          title: t("settings"),
          link: "/dashboard/settings",
        },
      ],
    }),
    []
  );

  const breadcrumbs = useMemo(
    () => (routeMapping[pathname] ? routeMapping[pathname] : []),
    [pathname]
  );

  return breadcrumbs;
}
