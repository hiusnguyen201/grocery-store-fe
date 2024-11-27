import { AlertDialogManual } from "@/components/alert-dialog-manual";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { removeProduct } from "@/lib/features/product-slice";
import { useAppDispatch } from "@/lib/hooks";
import { Product } from "@/types/product";
import { Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function DeleteCellAction({ data }: { data: Product }) {
  const t = useTranslations("Dashboard.ProductsPage");
  const dispatch = useAppDispatch();
  return (
    <AlertDialogManual
      trigger={
        <DropdownMenuItem>
          <Trash2 /> {t("titleDeleteCellAction")}
        </DropdownMenuItem>
      }
      title={t("titleAlertDialogDelete")}
      description={t("descriptionAlertDialogDelete")}
      onContinue={() => {
        dispatch(removeProduct(data._id));
      }}
      titleBtnCancel={t("titleBtnCancelAlertDialog")}
      titleBtnContinue={t("titleBtnContinueAlertDialog")}
    />
  );
}
