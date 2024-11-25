"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CheckIcon, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { Dispatch, SetStateAction } from "react";
import {
  SelectContent,
  SelectTrigger,
  Select,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

type FilterOption = {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
};

type FilterBoxProps = {
  id?: string;
  name: string;
  placeholder: string;
  options: FilterOption[];
  setFilterValue: Dispatch<SetStateAction<string | null>>;
  filterValue: string | null;
  multipleSelect?: boolean;
};

export function DataTableFilterBox({
  id,
  name,
  placeholder,
  options,
  setFilterValue,
  filterValue,
  multipleSelect = true,
}: FilterBoxProps) {
  const t = useTranslations("Dashboard.Common");
  const selectedValuesSet = React.useMemo(() => {
    if (!filterValue) return new Set<string>();
    const values = filterValue.split(".");
    return new Set(values.filter((value) => value !== ""));
  }, [filterValue]);

  const handleSelect = (value: string) => {
    const newSet = new Set(selectedValuesSet);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setFilterValue(Array.from(newSet).join(".") || null);
  };

  const resetFilter = () => setFilterValue(null);

  if (!multipleSelect) {
    return (
      <Select
        value={filterValue ? filterValue : ""}
        onValueChange={setFilterValue}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((opt) => {
              return (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.icon && <>{opt.icon}</>} {opt.label}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          {placeholder}
          {selectedValuesSet.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValuesSet.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {selectedValuesSet.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValuesSet.size}
                  </Badge>
                ) : (
                  Array.from(selectedValuesSet).map((value) => (
                    <Badge
                      variant="secondary"
                      key={value}
                      className="rounded-sm px-1 font-normal"
                    >
                      {options.find((option) => option.value === value)
                        ?.label || value}
                    </Badge>
                  ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput id={id} name={name} placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{t("noResults")}</CommandEmpty>
            <CommandGroup style={{ padding: 0 }}>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selectedValuesSet.has(option.value)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible"
                    )}
                  >
                    <CheckIcon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  {option.icon && (
                    <option.icon
                      className="mr-2 h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                  )}
                  <span>{option.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
            {selectedValuesSet.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={resetFilter}
                    className="justify-center text-center"
                  >
                    {t("clearFilters")}
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
