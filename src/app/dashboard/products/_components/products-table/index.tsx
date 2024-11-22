"use client";
import { DataTable } from "@/components/table/data-table";
import { GetColumns } from "./columns";
import { DataTableSearch } from "@/components/table/data-table-search";
import { useEffect, useState } from "react";
import { ProductStatus } from "@/constants";
import { DataTableFilterBox } from "@/components/table/data-table-filter-box";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { getAllProducts } from "@/lib/features/product-slice";

export function ProductsTable() {
  const t = useTranslations("Dashboard.ProductsPage");
  const [searchName, setSearchName] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const { list, meta } = useAppSelector(
    (state: RootState) => state.product
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          id="name"
          name="name"
          placeholder={t("placeholderSearchBox")}
          value={searchName}
          setValue={setSearchName}
        />
        <DataTableFilterBox
          id="status"
          name="status"
          placeholder={t("placeholderStatusFilterBox")}
          options={[
            { label: t("statusActive"), value: ProductStatus.ACTIVE },
            { label: t("statusInactive"), value: ProductStatus.INACTIVE },
          ]}
          filterValue={statusFilter}
          setFilterValue={setStatusFilter}
        />
      </div>

      <DataTable
        cellHeight="70px"
        columns={GetColumns()}
        data={list}
        metaData={meta}
      />
    </>
  );
}
