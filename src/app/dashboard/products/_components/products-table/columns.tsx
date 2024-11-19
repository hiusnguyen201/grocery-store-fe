import { ColumnDef } from "@tanstack/react-table";
import { formatDateStr } from "@/constants";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CellActions } from "./cell-actions";
import Image from "next/image";
import {
  DataTableSelectCell,
  DataTableSelectHeader,
} from "@/components/table/data-table-select-colum";
import { Product, ProductStatus } from "@/app/dashboard/products/schema";

const translateStatus: Record<ProductStatus, string> = {
  Active: "Hoạt động",
  Inactive: "Không hoạt động",
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => <DataTableSelectHeader header={table} />,
    cell: ({ row }) => <DataTableSelectCell row={row} />,
  },
  {
    id: "image",
    accessorKey: "image",
    header: "Ảnh",
    cell: ({ row }) => {
      if (!row.getValue("image")) return <></>;
      return (
        <div className="relative w-[35px] h-full">
          <Image
            src={row.getValue("image")}
            alt={row.getValue("name")}
            fill
            className="rounded"
            sizes="100%"
          />
        </div>
      );
    },
  },
  {
    id: "name",
    accessorKey: "name",
    header: "Tên",
  },
  {
    id: "marketPrice",
    accessorKey: "marketPrice",
    header: "Giá mua",
  },
  {
    id: "salePrice",
    accessorKey: "salePrice",
    header: "Giá bán",
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      return (
        <Badge className="py-1">
          {translateStatus[row.getValue("status") as ProductStatus]}
        </Badge>
      );
    },
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Thời gian tạo",
    cell: ({ row }) => {
      return <div>{format(row.getValue("createdAt"), formatDateStr)}</div>;
    },
  },
  {
    id: "actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => <CellActions data={row.original as Product} />,
  },
];
