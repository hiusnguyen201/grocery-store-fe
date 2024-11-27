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

  const breadcrumbs = useMemo(() => {
    const segments = (pathname as string).split("/").filter(Boolean);

    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;
      return {
        title: t.has(segment) ? t(segment) : segment,
        link: path,
      };
    });
  }, [pathname, t]);

  return { breadcrumbs };
}
