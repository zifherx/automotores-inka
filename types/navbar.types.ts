import { iMenuDashboard } from "@/interfaces";
import { LucideIcon } from "lucide-react";

export type iBtnShorcut = {
  icon: LucideIcon;
  className?: string;
  tooltip?: string;
};

export type iSidebarItem = {
  items: iMenuDashboard;
};
