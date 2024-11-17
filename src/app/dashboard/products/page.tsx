import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { ProductsTable } from "./_components/products-table";

export default function ProductsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <Heading title="Sản phẩm" description="Quản lý sản phẩm" />
        <Button>
          <Plus /> Thêm mới
        </Button>
      </div>

      <Separator />

      <ProductsTable />
    </div>
  );
}
