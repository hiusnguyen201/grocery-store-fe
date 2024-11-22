"use client";

import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { ProductsTable } from "./_components/products-table";
import { useTranslations } from "use-intl";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  const t = useTranslations("Dashboard.ProductsPage");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <Heading
          title={t("Heading.title")}
          description={t("Heading.description")}
        />

        <Link href={"/dashboard/products/new"}>
          <Button>
            <Plus /> {t("CreatePage.titleBtnCreate")}
          </Button>
        </Link>
      </div>

      <Separator />

      <ProductsTable />
    </div>
  );
}
