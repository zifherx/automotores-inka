import { ReactNode } from "react";

import { SidebarDashboard } from "./dashboard/components/SidebarDashboard";
import { NavbarDashboard } from "./dashboard/components/NavbarDashboard";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full h-full">
      <div className="hidden h-full xl:block w-80 xl:fixed">
        <SidebarDashboard />
      </div>
      <div className="w-full h-full xl:ml-80">
        <NavbarDashboard />
        <div className="p-6 h-max">{children}</div>
      </div>
    </div>
  );
}
