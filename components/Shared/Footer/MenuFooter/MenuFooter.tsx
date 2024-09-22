import { SubmenuItem } from "../SubmenuItem";

import { listSubmenuFooter } from "@/data";

export function MenuFooter() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 py-3 md:py-10">
      {listSubmenuFooter.map(({ id, submenu, title }) => (
        <div key={id} className="text-grisDarkInka space-y-1 pb-3 md:gap-y-5">
          <h2 className="text-lg uppercase font-bold mb-1 md:mb-5">{title}</h2>
          {submenu.map((item) => (
            <SubmenuItem key={item.id} items={item} />
          ))}
        </div>
      ))}
    </div>
  );
}
