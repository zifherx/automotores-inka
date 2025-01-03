import { LogoDashboard } from "./LogoDashboard";
import { SidebarRoutes } from "./SidebarRoutes";

export function SidebarDashboard() {
  return (
    <div className="h-screen">
      <aside className="flex flex-col h-full border-r">
        <LogoDashboard />
        <SidebarRoutes />
      </aside>
    </div>
  );
}
