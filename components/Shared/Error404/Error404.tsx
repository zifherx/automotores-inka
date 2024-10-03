import Link from "next/link";

import { listLinkUtiles } from "@/data/public.data";

export function Error404() {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="p-3 md:p-10">
        <h3 className="text-5xl font-headRegular mb-3">¡Error 404!</h3>
        <p className="max-w-sm mx-auto uppercase mb-10 text-xl font-textRegular">
          Aparentemente no podemos encontrar la página que estás buscando
        </p>
        <p>Quizás los siguientes enlaces te resulten útiles:</p>
        <div className="p-2 md:p-4 w-full md:max-w-lg mx-auto flex flex-row justify-between gap-1 md:gap-3 ">
          {listLinkUtiles.map(({ href, id, label }) => (
            <Link
              key={id}
              href={href}
              className="uppercase text-sm md:text-base font-textRegular text-grisInka hover:text-black"
            >
              {label}
              <div className="mt-1 h-px bg-grisDarkInka"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
