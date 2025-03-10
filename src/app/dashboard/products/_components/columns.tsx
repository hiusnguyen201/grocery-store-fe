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
import { useProductStatusOptions } from "@/app/dashboard/products/_hooks/use-product-status-options";

export function getColumns() {
  const t = useTranslations("Dashboard.ProductsPage");
  const { PRODUCT_STATUS_OPTIONS } = useProductStatusOptions();
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
          const { productImage, name } = row.original;
          if (!productImage) return <></>;
          return (
            <img
              src={productImage.smallPath}
              alt={name}
              className="rounded w-[50px] h-full"
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
          if (priceHistories && priceHistories.length > 0) {
            return formatCurrency(priceHistories[0].salePrice);
          } else {
            return <></>;
          }
        },
      },
      {
        id: "status",
        accessorKey: "status",
        header: t("statusField"),
        cell: ({ row }) => {
          const { status } = row.original;
          if (!status) return <></>;
          const statusOpt = PRODUCT_STATUS_OPTIONS.find(
            (opt) => status === opt.value
          );
          return (
            <Badge
              variant="outline"
              style={{
                backgroundColor: statusOpt?.bgColor,
                color: statusOpt?.textColor,
              }}
              className="py-1"
            >
              {t(`status${statusOpt?.value}`)}
            </Badge>
          );
        },
      },
      {
        id: "createdAt",
        accessorKey: "createdAt",
        header: t("createdAtField"),
        cell: ({ row }) => {
          const { createdAt } = row.original;
          if (!createdAt) return <></>;
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
