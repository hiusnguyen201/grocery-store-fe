"use client";
import { DataTable } from "@/components/table/data-table";
import { getColumns } from "./columns";
import { DataTableSearch } from "@/components/table/data-table-search";
import { Fragment, useEffect } from "react";
import { DataTableFilterBox } from "@/components/table/data-table-filter-box";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { getAllProducts } from "@/lib/features/product-slice";
import { useTableFilters } from "./use-table-filters";
import { useRouter } from "next/navigation";

export function ProductsTable() {
  const router = useRouter();
  const t = useTranslations("Dashboard.ProductsPage");
  const { list, meta } = useAppSelector(
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
    PRODUCT_STATUS_OPTIONS,
    filters,
  } = useTableFilters();

  const dispatch = useAppDispatch();
  useEffect(() => {
    router.push(`/dashboard/products?${new URLSearchParams(filters)}`);
    dispatch(getAllProducts(filters));
  }, [dispatch, page, limit, nameFilter, statusFilter]);

  return (
    <Fragment>
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          id="name"
          name="name"
          placeholder={t("placeholderSearchBox")}
          value={nameFilter}
          setValue={setNameFilter}
        />
        <DataTableFilterBox
          id="status"
          name="status"
          placeholder={t("placeholderStatusFilterBox")}
          options={PRODUCT_STATUS_OPTIONS}
          filterValue={statusFilter}
          setFilterValue={setStatusFilter}
        />
      </div>

      <DataTable
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
            setPage(page + 1);
          }
        }}
        onPrevious={() => {
          if (meta.isPrevious) {
            setPage(page - 1);
          }
        }}
      />
    </Fragment>
  );
}
