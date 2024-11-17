import { Button } from "@/components/ui/button";
import { ClipboardList, ClipboardPen, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Row } from "@tanstack/react-table";

export function CellActions<T>({ row }: { row: Row<T> }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Mở menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <ClipboardList /> Xem chi tiết
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ClipboardPen /> Sửa thông tin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
