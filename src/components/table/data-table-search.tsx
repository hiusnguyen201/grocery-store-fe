import { Input } from "@/components/ui/input";

export type DataTableSearchProps = {
  id?: string;
  name: string;
  value: string | null;
  placeholder?: string;
  onValueChange: (value: string) => void;
};

export function DataTableSearch({
  id,
  name,
  placeholder,
  value = "",
  onValueChange,
}: DataTableSearchProps) {
  return (
    <Input
      id={id}
      name={name}
      placeholder={placeholder}
      className="md:max-w-sm"
      value={value ? value : ""}
      onChange={(e) => {
        onValueChange(e.target.value);
      }}
    />
  );
}
