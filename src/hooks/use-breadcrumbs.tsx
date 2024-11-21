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
          title: t("dashboard"),
          link: "/dashboard/overview",
        },
      ],
      "/dashboard/products": [
        {
          title: t("dashboard"),
          link: "/dashboard/overview",
        },
        {
          title: t("products"),
          link: "/dashboard/products",
        },
      ],
      "/dashboard/products/new": [
        {
          title: t("dashboard"),
          link: "/dashboard/overview",
        },
        {
          title: t("products"),
          link: "/dashboard/products",
        },
        {
          title: t("newProduct"),
          link: "/dashboard/products/new",
        },
      ],
      "/dashboard/settings": [
        {
          title: t("dashboard"),
          link: "/dashboard/overview",
        },
        {
          title: t("settings"),
          link: "/dashboard/settings",
        },
      ],
    }),
    [t]
  );

  const breadcrumbs = useMemo(() => {
    if (routeMapping[pathname]) {
      return routeMapping[pathname];
    }

    // Else manual handle
    const segments = (pathname as string).split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        title: t.has(segment.toLowerCase())
          ? t(segment.toLowerCase())
          : segment.toLowerCase(),
        link: path,
      };
    });
  }, [pathname, t, routeMapping]);

  return breadcrumbs;
}
