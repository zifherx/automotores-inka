import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { iSidebarItem } from "@/types";

export function SidebarItem(props: iSidebarItem) {
  const { items } = props;
  const { href, icon: Icon, label } = items;

  const pathname = usePathname();
  const activePath = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        `flex gap-x-2 mt-2 text-slate-700 text-sm items-center hover:bg-sky-800 hover:text-slate-100 p-1 rounded-lg cursor-pointer`,
        activePath && "bg-sky-800 text-slate-100"
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1} />
      {label}
    </Link>
  );
}
