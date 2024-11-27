import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { hideProduct, showProduct } from "@/lib/features/product-slice";
import { useAppDispatch } from "@/lib/hooks";
import { Product } from "@/types/product";
import { Eye, EyeOff } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

export function ToggleHideCellAction({ data }: { data: Product }) {
  const t = useTranslations("Dashboard.ProductsPage");
  const dispatch = useAppDispatch();
  return (
    <DropdownMenuItem
      onClick={() => {
        if (data.hiddenAt) {
          dispatch(showProduct(data._id));
        } else {
          dispatch(hideProduct(data._id));
        }
      }}
    >
      {data.hiddenAt ? (
        <Fragment>
          <Eye /> {t("titleShowCellAction")}
        </Fragment>
      ) : (
        <Fragment>
          <EyeOff /> {t("titleHideCellAction")}
        </Fragment>
      )}
    </DropdownMenuItem>
  );
}
