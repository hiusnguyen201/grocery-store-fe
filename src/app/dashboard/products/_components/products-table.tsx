"use client";
import { DataTable } from "@/components/table/data-table";
import { getColumns } from "./columns";
import { DataTableSearch } from "@/components/table/data-table-search";
import { Fragment, useCallback, useEffect, useRef } from "react";
import { DataTableFilterBox } from "@/components/table/data-table-filter-box";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { getAllProducts } from "@/lib/features/product-slice";
import {
  initialFilter,
  useTableFilters,
} from "@/app/dashboard/products/_hooks/use-table-filters";
import { useProductStatusOptions } from "@/app/dashboard/products/_hooks/use-product-status-options";
import { usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export function ProductsTable() {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Dashboard.ProductsPage");
  const { PRODUCT_STATUS_OPTIONS } = useProductStatusOptions();
  const { list, meta, isLoading } = useAppSelector(
    (state: RootState) => state.product
  );
  const {
    page,
    setPage,
    limit,
    setLimit,
    nameFilter,
    setNameFilter,
    statusFilter,
    setStatusFilter,
    filters,
  } = useTableFilters({ metaData: meta });

  const prevNameFilterRef = useRef(nameFilter);

  const dispatch = useAppDispatch();

  const handleGetAllProducts = useCallback(() => {
    if (pathname !== "/dashboard/products") {
      router.push(`/dashboard/products?${new URLSearchParams(filters)}`);
    }
    dispatch(getAllProducts(filters));
  }, [dispatch, filters]);

  const debouncedHandleGetAllProducts = useDebouncedCallback(
    handleGetAllProducts,
    500
  );

  useEffect(() => {
    if (prevNameFilterRef.current !== nameFilter) {
      debouncedHandleGetAllProducts();
      prevNameFilterRef.current = nameFilter;
      return;
    }

    handleGetAllProducts();
  }, [dispatch, filters]);

  return (
    <Fragment>
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          id="name"
          name="name"
          placeholder={t("placeholderSearchBox")}
          value={nameFilter}
          onValueChange={(value) => {
            if (!filters.nameFilter) {
              setPage(initialFilter.page);
            }
            setNameFilter(value);
          }}
        />

        <DataTableFilterBox
          multipleSelect={false}
          id="status"
          name="status"
          placeholder={t("placeholderStatusFilterBox")}
          options={PRODUCT_STATUS_OPTIONS}
          filterValue={statusFilter}
          onFilterValueChange={(value) => {
            if (!filters.statusFilter) {
              setPage(initialFilter.page);
            }
            setStatusFilter(value);
          }}
        />
      </div>

      <DataTable
        loading={isLoading}
        cellHeight="70px"
        columns={getColumns()}
        data={list}
        metaData={meta}
        limit={limit}
        onLimitChange={(value) => {
          setLimit(value);
        }}
        onNext={() => {
          if (meta.isNext) {
            filters.page = page + 1;
            router.push(
              `/dashboard/products?${new URLSearchParams(filters)}`
            );
            setPage(page + 1);
          }
        }}
        onPrevious={() => {
          if (meta.isPrevious) {
            filters.page = page - 1;
            router.push(
              `/dashboard/products?${new URLSearchParams(filters)}`
            );
            setPage(page - 1);
          }
        }}
      />
    </Fragment>
  );
}
