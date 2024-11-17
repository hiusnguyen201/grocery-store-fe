"use client";

import * as React from "react";

import { NavMain, TNavMainItem } from "@/components/AppSidebar/nav-main";
import { NavUser, TNavUser } from "@/components/AppSidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavLogo, TNavLogo } from "./nav-logo";

export function AppSidebar({
  data,
  ...props
}: {
  data: { store: TNavLogo; user: TNavUser; navMain: TNavMainItem[] };
  props?: React.ComponentProps<typeof Sidebar>;
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavLogo store={data.store} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
