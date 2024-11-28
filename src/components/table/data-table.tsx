"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { MetaData } from "@/types/meta";
import { LIMIT_PAGE } from "@/constants";
import { Spinner } from "@/components/ui/spinner";
import { useMemo } from "react";
import { DataTableSkeleton } from "./data-table-skeleton";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  cellHeight?: string;
  metaData: MetaData;
  onPrevious?: () => void;
  onNext?: () => void;
  limit?: number;
  onLimitChange?: (value: number) => void;
  loading?: boolean;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  cellHeight,
  metaData,
  onPrevious,
  onNext,
  limit,
  onLimitChange,
  loading,
}: DataTableProps<TData, TValue>) {
  const tPage = useTranslations("Dashboard.ProductsPage");
  const tCommon = useTranslations("Dashboard.Common");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualFiltering: true,
    manualSorting: true,
  });

  return (
    <div className="w-full">
      <ScrollArea className="relative grid rounded-md border h-[calc(80vh-210px)] md:h-[calc(80vh-180px)] lg:h-[calc(80vh-150px)]">
        {loading && (
          <div className="absolute w-full h-full bg-[#fff] opacity-70 z-10 rounded-md flex items-center justify-center">
            <Spinner size={"large"} className="text-[#007bff]" />
          </div>
        )}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="w-full align-middle">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell height={cellHeight} key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {tCommon("noResults")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex flex-wrap items-center flex-col lg:py-4 py-3 lg:gap-3 gap-2 sm:flex-row">
        <div className="flex-1 min-h-[32px] flex items-center justify-center text-sm">
          {data.length > 0
            ? tPage("titleShowingEntries", {
                from: metaData.offset + 1,
                to: metaData.offset + metaData.limit,
                total: metaData.totalCount,
              })
            : tCommon("noEntries")}
        </div>

        <div className="flex-1 w-full flex items-center gap-3 justify-center">
          <p className="whitespace-nowrap text-sm">
            {tCommon("rowsPerPage")}
          </p>
          <Select
            value={limit?.toString()}
            onValueChange={(value) => {
              if (onLimitChange) {
                onLimitChange(+value);
              }
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={10} />
            </SelectTrigger>
            <SelectContent side="top">
              {LIMIT_PAGE.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="lg:flex-1 w-full flex items-center justify-center gap-3">
          <div className="flex items-center justify-center text-sm">
            {data.length > 0
              ? tPage("titleShowingPages", {
                  current: metaData.page,
                  total: metaData.totalPage,
                })
              : tCommon("noPages")}
          </div>
          <div className="flex items-center gap-2">
            {/* <Button
              aria-label="Go to first page"
              variant="outline"
              className="hidden h-8 w-8 p-0 md:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            </Button> */}
            <Button
              aria-label="Go to previous page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={onPrevious}
              disabled={!metaData.isPrevious}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button
              aria-label="Go to next page"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={onNext}
              disabled={!metaData.isNext}
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            {/* <Button
              aria-label="Go to last page"
              variant="outline"
              className="hidden h-8 w-8 p-0 md:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
