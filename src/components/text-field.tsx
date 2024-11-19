import React, { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export const TextField = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentPropsWithoutRef<typeof Input> & {
    error?: boolean;
    label?: ReactNode | string;
    helperText?: string | boolean;
  }
>(({ className, error, helperText, label, ...props }, ref) => (
  <div className="w-full">
    {label && (
      <Label htmlFor={props.id} className="text-base">
        {label}
      </Label>
    )}
    <Input ref={ref} className={className} {...props} />
    {helperText && (
      <p className={cn("mt-1 text-sm", error ? "text-red-500" : "")}>
        {helperText}
      </p>
    )}
  </div>
));
