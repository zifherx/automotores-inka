import { LucideIcon } from "lucide-react";

export interface iServicioPosventa {
  id: number;
  title: string;
  href: string;
  description: string;
}

export interface iMenuMobile {
  id?: number;
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface iMenuDashboard {
  id: number;
  icon: LucideIcon;
  label: string;
  href: string;
}
