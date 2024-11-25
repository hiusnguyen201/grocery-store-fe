import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LIMIT_PAGE } from "@/constants";
import { MetaData } from "@/types/meta";

export function useTableFilters({ metaData }: { metaData: MetaData }) {
  const searchParams = useSearchParams();
  const [limit, setLimit] = useState<number>(() => {
    const value = searchParams.get("limit");
    if (!value) {
      return LIMIT_PAGE[0];
    }
    return LIMIT_PAGE.includes(+value) ? +value : LIMIT_PAGE[0];
  });
  const [page, setPage] = useState<number>(() => {
    const value = searchParams.get("page");
    if (!value || +value < 1 || +value > metaData.totalPage) {
      return 1;
    } else {
      return +value;
    }
  });
  const [nameFilter, setNameFilter] = useState<string | null>(
    searchParams.get("name")
  );
  const [statusFilter, setStatusFilter] = useState<string | null>(
    searchParams.get("status")
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
