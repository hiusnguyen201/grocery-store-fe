import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction } from "react";

export type DataTableSearchProps = {
  id?: string;
  name: string;
  value: string | null;
  placeholder?: string;
  setValue: Dispatch<SetStateAction<string | null>>;
};

export function DataTableSearch({
  id,
  name,
  placeholder,
  value = "",
  setValue,
}: DataTableSearchProps) {
  return (
    <Input
      id={id}
      name={name}
      placeholder={placeholder}
      className="md:max-w-sm"
      value={value ? value : ""}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
