"use client";

import { CoverProvider } from "@/context/covers/coverContext";

import { ListCovers } from "./components/ListCovers";
import { BtnAddCover } from "./components/BtnAddCover";
import { BtnRefreshList } from "./components/BtnRefreshList";

export default function CoversPage() {
  return (
    <CoverProvider>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between">
          <h2 className="flex items-center gap-1 text-xl md:text-3xl font-headMedium">
            Gestión de Portadas
          </h2>
          <div className="flex justify-between gap-1">
            <BtnAddCover />
            <BtnRefreshList />
          </div>
        </div>
        <ListCovers />
      </div>
    </CoverProvider>
  );
}
