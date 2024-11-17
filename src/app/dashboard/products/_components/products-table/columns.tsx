import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import { formatDateStr, ProductStatus } from "@/constants";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CellActions } from "./cell-actions";

export type Product = {
  _id: string;
  name: string;
  marketPrice: number;
  salePrice: number;
  status: ProductStatus;
  createdAt: Date;
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
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
      return <Badge className="py-1">{row.getValue("status")}</Badge>;
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
    cell: ({ row }) => <CellActions row={row} />,
  },
];
