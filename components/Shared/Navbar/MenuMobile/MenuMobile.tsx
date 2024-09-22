import Link from "next/link";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { BtnShorcut } from "../../BtnShorcut";

import { Menu } from "lucide-react";
import { listItemMenuMobile } from "@/data";

export function MenuMobile() {
  return (
    <Popover>
      <PopoverTrigger>
        <BtnShorcut icon={Menu} className="text-black" />
      </PopoverTrigger>
      <PopoverContent className="p-2">
        {listItemMenuMobile.map(({ id, href, icon: Icon, title }) => (
          <div
            key={id}
            className="flex flew-col items-center pl-3 py-3 hover:bg-blueInka hover:rounded-r-xl hover:text-white"
          >
            <Link
              href={href}
              className="flex flew-row items-center text-lg cursor-pointer"
            >
              <Icon className="w-5 h-5 mr-2" />
              {title}
            </Link>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
