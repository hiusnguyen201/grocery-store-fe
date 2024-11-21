import { AlertDialogManual } from "@/components/alert-dialog-manual";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";

export default function Actions({
  disableAction,
}: {
  disableAction: boolean;
}) {
  const t = useTranslations("Dashboard.ProductsPage");
  return (
    <div className="sticky shadow-reverse mb-[-16px] mt-5 bg-[#fff] border-t mx-[-24px] bottom-0 p-4 md:px-6 flex gap-3 items-center justify-end transition-[width,height] ease-linear h-16 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <AlertDialogManual
        trigger={
          <Button type="button" variant="outline">
            {t("titleBtnCancel")}
          </Button>
        }
        title="Xác nhận"
        description="Hủy thay đổi?"
        onContinue={() => {
          redirect("/dashboard/products");
        }}
      />
      <Button disabled={disableAction} type="submit" variant="outline">
        {t("titleBtnSaveAndHide")}
      </Button>
      <Button type="submit" disabled={disableAction}>
        {t("titleBtnSaveAndShow")}
      </Button>
    </div>
  );
}
