"use client";

import { AlertDialogManual } from "@/components/alert-dialog-manual";
import { Button } from "@/components/ui/button";
import { ProductStatus } from "@/constants";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Actions({
  disableAction,
  onStatusChange,
}: {
  disableAction: boolean;
  onStatusChange?: (value: ProductStatus) => void;
}) {
  const [hrefOut, setHrefOut] = useState("/dashboard/products");
  const [openAlert, setOpenAlert] = useState(false);
  const t = useTranslations("Dashboard.ProductsPage");

  // Alert cancel
  useEffect(() => {
    const handleClick = (e: any) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        const href = e.target.getAttribute("href");
        setHrefOut(href);
        setOpenAlert(true);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="sticky shadow-reverse bg-[#fff] border-t bottom-0 p-4 md:px-6 flex gap-3 items-center justify-end transition-[width,height] ease-linear h-16 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <AlertDialogManual
        open={openAlert}
        onOpenChange={setOpenAlert}
        trigger={
          <Button type="button" variant="outline">
            {t("titleBtnCancel")}
          </Button>
        }
        title="Xác nhận"
        description="Hủy thay đổi?"
        onContinue={() => {
          redirect(hrefOut);
        }}
      />
      <Button
        disabled={disableAction}
        type="submit"
        variant="outline"
        onClick={() => {
          if (!onStatusChange) return;
          onStatusChange(ProductStatus.INACTIVE);
        }}
      >
        {t("titleBtnSaveAndHide")}
      </Button>
      <Button
        type="submit"
        disabled={disableAction}
        onClick={() => {
          if (!onStatusChange) return;
          onStatusChange(ProductStatus.ACTIVE);
        }}
      >
        {t("titleBtnSaveAndShow")}
      </Button>
    </div>
  );
}
