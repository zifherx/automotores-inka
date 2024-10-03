"use client";

import { useAuth } from "@clerk/nextjs";

import { isAdministrator } from "@/lib/isAdministrator";
import { Separator } from "@/components/ui/separator";

import { SidebarItem } from "../SidebarItem";

import {
  listItemMenuADV,
  listItemMenuGeneral,
  listItemMenuLegal,
  listItemMenuPosventa,
  listItemMenuSistema,
  listItemMenuVentas,
} from "@/data";
import { ScrollArea } from "@/components/ui/scroll-area";

export function SidebarRoutes() {
  const { userId } = useAuth();

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <ScrollArea className="h-[650px] w-full border md:border-none">
          <div className="p-2 md:p-4">
            <p className="mb-2 text-slate-500">General</p>
            {listItemMenuGeneral.map((items) => (
              <SidebarItem key={items.id} items={items} />
            ))}
          </div>

          <Separator />
          {isAdministrator(userId) && (
            <div>
              <div className="p-2 md:p-4">
                <p className="mb-2 text-slate-500">ADV</p>
                {listItemMenuADV.map((items) => (
                  <SidebarItem key={items.id} items={items} />
                ))}
              </div>

              <Separator />

              <div className="p-2 md:p-4">
                <p className="mb-2 text-slate-500">Comercial</p>
                {listItemMenuVentas.map((items) => (
                  <SidebarItem key={items.id} items={items} />
                ))}
              </div>

              <Separator />

              <div className="p-2 md:p-4">
                <p className="mb-2 text-slate-500">Posventa</p>
                {listItemMenuPosventa.map((items) => (
                  <SidebarItem key={items.id} items={items} />
                ))}
              </div>

              <Separator />

              <div className="p-2 md:p-4">
                <p className="mb-2 text-slate-500">Legal</p>
                {listItemMenuLegal.map((items) => (
                  <SidebarItem key={items.id} items={items} />
                ))}
              </div>

              <Separator />

              <div className="p-2 md:p-4">
                <p className="mb-2 text-slate-500">Sistema</p>
                {listItemMenuSistema.map((items) => (
                  <SidebarItem key={items.id} items={items} />
                ))}
              </div>
            </div>
          )}
        </ScrollArea>

        <div>
          <Separator />
          <footer className="flex flex-col p-3 mt-3 text-center gap-y-1">
            <p>Ziphonex 2024</p>
            <p className="text-muted bg-blue-900 rounded-lg">
              Todos los derechos reservados.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
