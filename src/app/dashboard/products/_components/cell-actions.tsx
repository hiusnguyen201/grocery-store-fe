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
import {
  hideProduct,
  removeProduct,
  showProduct,
} from "@/lib/features/product-slice";
import { Product } from "@/types/product";
import { useTranslations } from "next-intl";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useCallback, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { AlertDialogManual } from "@/components/alert-dialog-manual";

export function CellActions({ data }: { data: Product }) {
  const t = useTranslations("Dashboard.ProductsPage");
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { error } = useAppSelector((state: RootState) => state.product);

  const handleShow = useCallback(async () => {
    toast({
      title: t("Messages.showProcessing"),
    });

    await dispatch(showProduct(data._id));
    setOpen(false);

    if (!error) {
      toast({
        title: t("Messages.showProductSuccess"),
        variant: "success",
      });
    } else {
      toast({
        title: t("Messages.showProductFailed"),
        variant: "destructive",
      });
    }
  }, [data]);

  const handleHide = useCallback(async () => {
    toast({
      title: t("Messages.hideProcessing"),
    });

    await dispatch(hideProduct(data._id));
    setOpen(false);

    if (!error) {
      toast({
        title: t("Messages.hideProductSuccess"),
        variant: "success",
      });
    } else {
      toast({
        title: t("Messages.hideProductFailed"),
        variant: "destructive",
      });
    }
  }, [data]);

  const handleDelete = useCallback(async () => {
    toast({
      title: t("Messages.removeProcessing"),
    });

    await dispatch(removeProduct(data._id));
    setOpen(false);

    if (!error) {
      toast({
        title: t("Messages.removeProductSuccess"),
        variant: "success",
      });
    } else {
      toast({
        title: t("Messages.removeProductFailed"),
        variant: "destructive",
      });
    }
  }, [data]);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
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

        {!data.hiddenAt && (
          <DropdownMenuItem onClick={handleHide}>
            <EyeOff /> {t("titleHideCellAction")}
          </DropdownMenuItem>
        )}

        {data.hiddenAt && (
          <DropdownMenuItem onClick={handleShow}>
            <Eye /> {t("titleShowCellAction")}
          </DropdownMenuItem>
        )}

        {data.hiddenAt && (
          <AlertDialogManual
            trigger={
              <DropdownMenuItem>
                <Trash2 /> {t("titleDeleteCellAction")}
              </DropdownMenuItem>
            }
            title={t("titleAlertDialogDelete")}
            description={t("descriptionAlertDialogDelete")}
            onContinue={handleDelete}
            titleBtnCancel={t("titleBtnCancelAlertDialog")}
            titleBtnContinue={t("titleBtnContinueAlertDialog")}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
