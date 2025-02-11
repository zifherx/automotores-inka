import { Suspense } from "react";

import { NoticiasList } from "../NoticiasList";
import { NoticiasSkeleton } from "../NoticiasSkeleton";

export function NoticiasSection() {
  return (
    <div className="max-w-7xl mx-auto border-2 border-black py-12 px-4">
      <h2 className="text-4xl font-headBold text-blueInka">Noticias</h2>
      <div className="h-0.5 rounded-lg w-32 bg-blueInka my-3"></div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <Suspense fallback={<NoticiasSkeleton />}>
          <NoticiasList />
        </Suspense>
      </div>
    </div>
  );
}
