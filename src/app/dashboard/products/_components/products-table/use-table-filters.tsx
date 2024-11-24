import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LIMIT_PAGE, ProductStatus } from "@/constants";
import { useTranslations } from "next-intl";

export function useTableFilters() {
  const t = useTranslations("Dashboard.ProductsPage");
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(
    Number(searchParams.get("page") || 1)
  );
  const [limit, setLimit] = useState<number>(
    Number(searchParams.get("limit") || LIMIT_PAGE[0])
  );
  const [nameFilter, setNameFilter] = useState<string | null>(
    searchParams.get("name")
  );
  const [statusFilter, setStatusFilter] = useState<string | null>(
    searchParams.get("status")
  );

  const PRODUCT_STATUS_OPTIONS = useMemo(
    () => [
      { label: t("statusActive"), value: ProductStatus.ACTIVE },
      { label: t("statusInactive"), value: ProductStatus.INACTIVE },
    ],
    []
  );

  const filters: Record<string, string> = useMemo(
    () => ({
      page: page.toString(),
      limit: limit.toString(),
      ...(nameFilter ? { name: nameFilter } : {}),
      ...(statusFilter ? { status: statusFilter } : {}),
    }),
    [page, limit, nameFilter, statusFilter]
  );

  return {
    PRODUCT_STATUS_OPTIONS,
    page,
    nameFilter,
    limit,
    statusFilter,
    setLimit,
    setPage,
    setNameFilter,
    setStatusFilter,
    filters,
  };
}
