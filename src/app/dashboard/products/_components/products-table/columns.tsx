"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { CellActions } from "./cell-actions";
import Image from "next/image";
import {
  DataTableSelectCell,
  DataTableSelectHeader,
} from "@/components/table/data-table-select-colum";
import { Product } from "@/types/product";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { TextFormatter } from "@/components/text-formatter";

export function GetColumns() {
  const t = useTranslations("Dashboard.ProductsPage");
  const columns: ColumnDef<Product>[] = useMemo(
    () => [
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
        header: t("imageField"),
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
        header: t("nameProductField"),
      },
      {
        id: "marketPrice",
        accessorKey: "marketPrice",
        header: t("marketPriceField"),
      },
      {
        id: "salePrice",
        accessorKey: "salePrice",
        header: t("salePriceField"),
      },
      {
        id: "status",
        accessorKey: "status",
        header: t("statusField"),
        cell: ({ row }) => {
          return (
            <Badge className="py-1">
              {t(`status${row.getValue("status")}`)}
            </Badge>
          );
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: t("createdAtField"),
        cell: ({ row }) => {
          return (
            <TextFormatter type="date" value={row.getValue("createdAt")} />
          );
        },
      },
      {
        id: "actions",
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => <CellActions data={row.original as Product} />,
      },
    ],
    [t]
  );

  return columns;
}
