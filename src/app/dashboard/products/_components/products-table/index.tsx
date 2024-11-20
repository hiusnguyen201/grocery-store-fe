"use client";
import { DataTable } from "@/components/table/data-table";
import { getColumns } from "./columns";
import { DataTableSearch } from "@/components/table/data-table-search";
import { Fragment, useState } from "react";
import { Product, ProductStatus } from "@/app/dashboard/products/schema";
import { DataTableFilterBox } from "@/components/table/data-table-filter-box";
import { useTranslations } from "next-intl";

const data: Product[] = [
  {
    _id: "1",
    image: "/image.jpg",
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
];

export function ProductsTable() {
  const [searchName, setSearchName] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const t = useTranslations("Dashboard.ProductsPage");

  return (
    <Fragment>
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          field="name"
          placeholder={t("placeholderSearchBox")}
          value={searchName}
          setValue={setSearchName}
        />
        <DataTableFilterBox
          field="status"
          placeholder={t("placeholderStatusFilterBox")}
          options={[
            { label: t("statusActive"), value: ProductStatus.ACTIVE },
            { label: t("statusInactive"), value: ProductStatus.INACTIVE },
          ]}
          filterValue={statusFilter}
          setFilterValue={setStatusFilter}
        />
      </div>

      <DataTable cellHeight="70px" columns={getColumns()} data={data} />
    </Fragment>
  );
}
