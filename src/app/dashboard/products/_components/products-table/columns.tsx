"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { CellActions } from "./cell-actions";
import {
  DataTableSelectCell,
  DataTableSelectHeader,
} from "@/components/table/data-table-select-colum";
import { Product } from "@/types/product";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { formatCurrency, formatDate } from "@/lib/utils";

export function getColumns() {
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
          const { image, name } = row.original;
          if (!image) return <></>;
          return (
            <img
              src={image}
              alt={name}
              className="rounded w-[45px] h-full"
            />
          );
        },
      },
      {
        id: "name",
        accessorKey: "name",
        header: t("nameProductField"),
      },
      {
        id: "salePrice",
        accessorKey: "salePrice",
        header: t("salePriceField"),
        cell: ({ row }) => {
          const { priceHistories } = row.original;
          return formatCurrency(priceHistories[0].salePrice);
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: t("statusField"),
        cell: ({ row }) => {
          const { status } = row.original;
          return <Badge className="py-1">{t(`status${status}`)}</Badge>;
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: t("createdAtField"),
        cell: ({ row }) => {
          const { createdAt } = row.original;
          return formatDate(createdAt, {
            type: "short",
          });
        },
      },
      {
        id: "actions",
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => {
          const data = row.original;
          return <CellActions data={data} />;
        },
      },
    ],
    [t]
  );

  return columns;
}
