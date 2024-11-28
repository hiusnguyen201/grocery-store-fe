import { AlertDialogManual } from "@/components/alert-dialog-manual";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export function AlertRedirectDialog({
  children,
}: {
  children: ReactNode;
}) {
  const [hrefOut, setHrefOut] = useState("/dashboard/products");
  const [openAlert, setOpenAlert] = useState(false);
  const t = useTranslations("Dashboard.ProductsPage");

  // Alert redirect
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
    <AlertDialogManual
      open={openAlert}
      onOpenChange={setOpenAlert}
      trigger={children}
      title={t("titleAlertDialogCancelCreateOrUpdate")}
      description={t("descriptionAlertDialogCancelCreateOrUpdate")}
      onContinue={() => {
        redirect(hrefOut);
      }}
      titleBtnCancel={t("titleBtnCancelAlertDialog")}
      titleBtnContinue={t("titleBtnContinueAlertDialog")}
    />
  );
}
