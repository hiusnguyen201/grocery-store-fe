import { Input } from "@/components/ui/input";
import { Dispatch, SetStateAction, useState } from "react";

export type DataTableSearchProps = {
  field: string;
  value: string;
  placeholder?: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export function DataTableSearch({
  field,
  placeholder,
  value = "",
  setValue,
}: DataTableSearchProps) {
  return (
    <Input
      id={field}
      name={field}
      placeholder={placeholder}
      className="md:max-w-sm"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
