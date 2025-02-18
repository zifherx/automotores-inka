"use client";

import { useNews } from "@/context/news/noticeContext";
import { CardNoticia } from "../CardNoticia";
import { TableLoading } from "@/components/Shared/TableLoading";

export function ListNoticias() {
  const { news, isLoadingData } = useNews();

  if (isLoadingData) {
    return <TableLoading />;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-2">
      {news.length === 0 ? (
        <p className="text-center text-2xl font-textRegular col-span-4">
          No existen registros
        </p>
      ) : (
        news.map((item) => <CardNoticia key={item._id} noticia={item} />)
      )}
    </div>
  );
}
