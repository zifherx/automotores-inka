import { ReactNode } from "react";
import type { Metadata } from "next";

import { SidebarDashboard } from "./dashboard/components/SidebarDashboard";
import { NavbarDashboard } from "./dashboard/components/NavbarDashboard";

export const metadata: Metadata = {
  title: {
    default: "CMS Dashboard",
    template: "",
  },
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full h-full">
      <div className="hidden h-full xl:block w-80 xl:fixed">
        <SidebarDashboard />
      </div>
      <div className="w-full h-full xl:ml-80">
        <NavbarDashboard />
        <div className="p-4 h-max">{children}</div>
      </div>
    </div>
  );
}
