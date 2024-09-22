import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";

export interface iRedesSociales {
  id: number;
  icon: IconType;
  name: string;
  href: string;
}

export interface iMenuFooter {
  id: number;
  title: string;
  submenu: iSubmenuFooter[];
}

export interface iSubmenuFooter {
  id: number;
  icon?: LucideIcon;
  href: string;
  label: string;
}
