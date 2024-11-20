"use client";

import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { ProductsTable } from "./_components/products-table";
import { CreateProductForm } from "./_components/product-form/create-product-form";
import { useTranslations } from "use-intl";

export default function ProductsPage() {
  const t = useTranslations("Dashboard.ProductsPage");

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <Heading title={t("title")} description={t("description")} />
        <CreateProductForm />
      </div>

      <Separator />

      <ProductsTable />
    </div>
  );
}
