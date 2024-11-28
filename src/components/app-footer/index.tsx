import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AppFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "sticky shadow-reverse bg-[#fff] border-t bottom-0 p-4 md:px-6 flex gap-3 items-center transition-[width,height] ease-linear h-16 group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12",
        className
      )}
    >
      {children}
    </div>
  );
}
