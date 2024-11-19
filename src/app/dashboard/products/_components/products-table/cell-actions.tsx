"use client";

import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  ClipboardPen,
  EyeOff,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Product } from "@/app/dashboard/products/schema";
import { AlertDialogManual } from "@/components/alert-dialog-manual";

export function CellActions({ data }: { data: Product }) {
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

        <Link href={`/dashboard/products/${data.slug || data._id}`}>
          <DropdownMenuItem>
            <ClipboardList /> Xem chi tiết
          </DropdownMenuItem>
        </Link>

        <DropdownMenuItem>
          <ClipboardPen /> Sửa thông tin
        </DropdownMenuItem>

        <DropdownMenuItem>
          <EyeOff /> Ẩn
        </DropdownMenuItem>

        <AlertDialogManual
          title="Are you absolutely sure?"
          description="This action cannot be undone. This will permanently delete your
            account and remove your data from our servers."
          onContinue={() => {
            // Send api
          }}
          trigger={
            <DropdownMenuItem>
              <Trash2 /> Xóa
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
