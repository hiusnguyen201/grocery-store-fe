import { Heading } from "@/components/heading";
import { Separator } from "@/components/ui/separator";
import { ProductsTable } from "./_components/products-table";
import { CreateProductForm } from "./_components/product-form/create-product-form";

export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <Heading title="Sản phẩm" description="Quản lý sản phẩm" />
        <CreateProductForm />
      </div>

      <Separator />

      <ProductsTable />
    </div>
  );
}
