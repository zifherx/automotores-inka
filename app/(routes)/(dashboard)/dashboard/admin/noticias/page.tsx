"use client";

import { NewsProvider } from "@/context/news/noticeContext";

import { BtnAddNoticia } from "./components/BtnAddNoticia";
import { ListNoticias } from "./components/ListNoticias";
import { BtnRefreshNoticia } from "./components/BtnRefreshNoticia";

export default function AdminNewsPage() {
  return (
    <NewsProvider>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="flex items-center gap-1 text-xl md:text-3xl font-headMedium">
            Gestión de Noticias
          </h2>
          <div className="flex justify-between gap-1">
            <BtnAddNoticia />
            <BtnRefreshNoticia />
          </div>
        </div>
        <ListNoticias />
      </div>
    </NewsProvider>
  );
}
