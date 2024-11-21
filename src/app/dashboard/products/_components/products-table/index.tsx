"use client";
import { DataTable } from "@/components/table/data-table";
import { GetColumns } from "./columns";
import { DataTableSearch } from "@/components/table/data-table-search";
import { useMemo, useState } from "react";
import { Product, ProductStatus } from "@/app/dashboard/products/schema";
import { DataTableFilterBox } from "@/components/table/data-table-filter-box";
import { useTranslations } from "next-intl";

export function ProductsTable() {
  const [searchName, setSearchName] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const t = useTranslations("Dashboard.ProductsPage");

  const data: Product[] = useMemo(
    () => [
      {
        _id: "1",
        image: "/image.jpg",
        slug: "product-1",
        name: "Product 1",
        marketPrice: 5000,
        salePrice: 5000,
        status: ProductStatus.ACTIVE,
        createdAt: new Date(),
      },
      {
        _id: "2",
        name: "Product 2",
        marketPrice: 2000,
        salePrice: 5000,
        status: ProductStatus.ACTIVE,
        createdAt: new Date(),
      },
      {
        _id: "3",
        name: "Product 0",
        image: "/image.jpg",
        marketPrice: 2000,
        salePrice: 5000,
        status: ProductStatus.INACTIVE,
        createdAt: new Date(),
      },
      {
        _id: "4",
        name: "Product 5",
        image: "/image.jpg",
        marketPrice: 1000,
        salePrice: 10000,
        status: ProductStatus.ACTIVE,
        createdAt: new Date(),
      },
      {
        _id: "5",
        name: "Product 2",
        marketPrice: 1000,
        salePrice: 1000,
        status: ProductStatus.ACTIVE,
        createdAt: new Date(),
      },
    ],
    []
  );

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

      <DataTable cellHeight="70px" columns={GetColumns()} data={data} />
    </>
  );
}
