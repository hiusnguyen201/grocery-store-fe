import React from "react";
import { SidebarMenuButton } from "../ui/sidebar";
import { LucideProps } from "lucide-react";

export type TNavLogo = {
  name: string;
  logo: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  plan: string;
};

export function NavLogo({ store }: { store: TNavLogo }) {
  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:text-sidebar-accent-foreground"
    >
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <store.logo className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{store.name}</span>
        <span className="truncate text-xs">{store.plan}</span>
      </div>
    </SidebarMenuButton>
  );
}
