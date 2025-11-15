"use client";

import { useAuth } from "@clerk/nextjs";

import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  listItemMenuADV,
  listItemMenuComercial,
  listItemMenuGeneral,
  listItemMenuLegal,
  listItemMenuPosventa,
  listItemMenuSistema,
} from "@/data";
import { SidebarItem } from "../SidebarItem";

import {
  canAccessADVPanel,
  canAccessComercialPanel,
  canAccessConfigurationPanel,
  canAccessLegalPanel,
  canAccessPosventaPanel,
  isAdministrator,
  isADV,
  isComercial,
  isLegal,
  isPosventa,
} from "@/lib";

export function SidebarRoutes() {
  const { userId } = useAuth();

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <ScrollArea className="h-[500px] w-full border md:border-none">
          <div className="p-2 md:p-4">
            <p className="mb-2 text-slate-500">General</p>
            {listItemMenuGeneral.map((items) => (
              <SidebarItem key={items.id} items={items} />
            ))}
          </div>

          <Separator />
          {canAccessADVPanel(userId) && (
            <div className="p-2 md:p-4">
              <p className="mb-2 text-slate-500">ADV</p>
              {listItemMenuADV.map((items) => (
                <SidebarItem key={items.id} items={items} />
              ))}
            </div>
          )}

          <Separator />

          {canAccessComercialPanel(userId) && (
            <div className="p-2 md:p-4">
              <p className="mb-2 text-slate-500">Comercial</p>
              {listItemMenuComercial.map((items) => (
                <SidebarItem key={items.id} items={items} />
              ))}
            </div>
          )}

          <Separator />

          {canAccessPosventaPanel(userId) && (
            <div className="p-2 md:p-4">
              <p className="mb-2 text-slate-500">Posventa</p>
              {listItemMenuPosventa.map((items) => (
                <SidebarItem key={items.id} items={items} />
              ))}
            </div>
          )}

          <Separator />

          {canAccessLegalPanel(userId) && (
            <div className="p-2 md:p-4">
              <p className="mb-2 text-slate-500">Legal</p>
              {listItemMenuLegal.map((items) => (
                <SidebarItem key={items.id} items={items} />
              ))}
            </div>
          )}

          <Separator />

          {canAccessConfigurationPanel(userId) && (
            <div className="p-2 md:p-4">
              <p className="mb-2 text-slate-500">Sistema</p>
              {listItemMenuSistema.map((items) => (
                <SidebarItem key={items.id} items={items} />
              ))}
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
