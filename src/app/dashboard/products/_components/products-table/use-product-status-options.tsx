import { ProductStatus } from "@/constants";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export function useProductStatusOptions() {
  const t = useTranslations("Dashboard.ProductsPage");

  const PRODUCT_STATUS_OPTIONS = useMemo(
    () => [
      {
        textColor: "#fff",
        bgColor: "#007bff",
        label: t("statusActive"),
        value: ProductStatus.ACTIVE,
      },
      {
        textColor: "#000",
        bgColor: "#ffc107",
        label: t("statusInactive"),
        value: ProductStatus.INACTIVE,
      },
      {
        textColor: "#fff",
        bgColor: "#dc3545",
        label: t("statusInactive"),
        value: ProductStatus.DELETED,
      },
    ],
    [t]
  );

  return { PRODUCT_STATUS_OPTIONS };
}
