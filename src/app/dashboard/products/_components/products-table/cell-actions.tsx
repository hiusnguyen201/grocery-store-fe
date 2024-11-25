"use client";

import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  ClipboardPen,
  Eye,
  EyeOff,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
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
import { AlertDialogManual } from "@/components/alert-dialog-manual";
import { useTranslations } from "next-intl";
import { Fragment, useCallback, useMemo } from "react";
import { useAppDispatch } from "@/lib/hooks";
// import { UpdateProductForm } from "../product-form/update-product-form";
import { hideProduct, showProduct } from "@/lib/features/product-slice";

export function CellActions({ data }: { data: Product }) {
  const t = useTranslations("Dashboard.ProductsPage");
  const dispatch = useAppDispatch();

  const toggleShowAndHide = useCallback(async () => {
    if (data.hiddenAt) {
      dispatch(showProduct(data._id));
    } else {
      dispatch(hideProduct(data._id));
    }
  }, [data]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t("titleCellActions")}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <Link href={`/dashboard/products/${data.slug || data._id}`}>
            <DropdownMenuItem>
              <ClipboardList /> {t("titleDetailsAction")}
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem>
            <ClipboardPen /> {t("titleEditAction")}
          </DropdownMenuItem>

          <DropdownMenuItem onClick={toggleShowAndHide}>
            {data.hiddenAt ? (
              <Fragment>
                <Eye /> {t("titleShowAction")}
              </Fragment>
            ) : (
              <Fragment>
                <EyeOff /> {t("titleHideAction")}
              </Fragment>
            )}
          </DropdownMenuItem>

          <AlertDialogManual
            trigger={
              <DropdownMenuItem>
                <Trash2 /> {t("titleDeleteAction")}
              </DropdownMenuItem>
            }
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete your
            account and remove your data from our servers."
            onContinue={() => {
              // Send api
            }}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
