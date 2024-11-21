"use client";

import { ComponentPropsWithoutRef, ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

type TextFieldProps = {
  error?: boolean;
  label?: ReactNode | string;
  helperText?: string | boolean;
};

export function TextField({
  error,
  helperText,
  label,
  ...props
}: TextFieldProps & ComponentPropsWithoutRef<typeof Input>) {
  return (
    <div className="w-full">
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <Input {...props} />
      {helperText && (
        <p className={cn("mt-1", error ? "text-red-500" : "")}>
          {helperText}
        </p>
      )}
    </div>
  );
}
