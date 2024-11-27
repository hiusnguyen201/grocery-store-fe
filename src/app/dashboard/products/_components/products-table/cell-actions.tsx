"use client";

import { Button } from "@/components/ui/button";
import { ClipboardList, ClipboardPen, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Product } from "@/types/product";
import { useTranslations } from "next-intl";
import { ToggleHideCellAction } from "./show-hide-cell-action";
import { DeleteCellAction } from "./delete-cell-action";

export function CellActions({ data }: { data: Product }) {
  const t = useTranslations("Dashboard.ProductsPage");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{t("titleCellActions")}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link
          href={`/dashboard/products/details/${data.slug || data._id}`}
        >
          <DropdownMenuItem>
            <ClipboardList /> {t("titleDetailsCellAction")}
          </DropdownMenuItem>
        </Link>

        <Link href={`/dashboard/products/${data.slug || data._id}`}>
          <DropdownMenuItem>
            <ClipboardPen /> {t("titleEditCellAction")}
          </DropdownMenuItem>
        </Link>

        <ToggleHideCellAction data={data} />

        <DeleteCellAction data={data} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
