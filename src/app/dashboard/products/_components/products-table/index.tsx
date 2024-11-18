"use client";
import { DataTable } from "@/components/ui/table/data-table";
import { columns, Product } from "./columns";
import { DataTableSearch } from "@/components/ui/table/data-table-search";
import { Fragment, useState } from "react";
import { ProductStatus } from "@/constants";
import { DataTableFilterBox } from "@/components/ui/table/data-table-filter-box";

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

  return (
    <Fragment>
      <div className="flex flex-wrap items-center gap-4">
        <DataTableSearch
          field="name"
          placeholder="Tìm kiếm tên..."
          value={searchName}
          setValue={setSearchName}
        />
        <DataTableFilterBox
          field="status"
          placeholder="Trạng thái"
          options={[
            { label: "Hoạt động", value: ProductStatus.ACTIVE },
            { label: "Không hoạt động", value: ProductStatus.INACTIVE },
          ]}
          filterValue={statusFilter}
          setFilterValue={setStatusFilter}
        />
      </div>

      <DataTable columns={columns} data={data} />
    </Fragment>
  );
}
