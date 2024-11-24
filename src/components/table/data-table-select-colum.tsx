import { Checkbox } from "@/components/ui/checkbox";
import { Row, Table } from "@tanstack/react-table";

type DataTableSelectHeaderProps<T> = {
  header: Table<T>;
};

export function DataTableSelectHeader<T>({
  header,
}: DataTableSelectHeaderProps<T>) {
  return (
    <Checkbox
      checked={
        header.getIsAllPageRowsSelected() ||
        (header.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value) =>
        header.toggleAllPageRowsSelected(!!value)
      }
      aria-label="Select all"
    />
  );
}

type DataTableSelectCellProps<T> = {
  row: Row<T>;
};

export function DataTableSelectCell<T>({
  row,
}: DataTableSelectCellProps<T>) {
  return (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  );
}
