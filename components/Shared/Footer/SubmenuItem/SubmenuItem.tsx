import Link from "next/link";
import { cn } from "@/lib/utils";

import { iSubmenuItem } from "@/interfaces/iFooter";

export function SubmenuItem(props: iSubmenuItem) {
  const { items } = props;
  const { href, label } = items;

  return (
    <Link
      href={href}
      className={cn(
        `flex text-grisDarkInka items-center justify-start font-light`
      )}
    >
      {label}
    </Link>
  );
}
