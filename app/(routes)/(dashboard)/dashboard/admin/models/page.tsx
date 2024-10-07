import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BtnAddModel } from "./components/BtnAddModel";
import { ListModels } from "./components/ListModels";

import { dbConnect, serializeDocument, isAdministrator } from "@/lib";

import Marca from "@/models/Marca";
import Carroceria from "@/models/Carroceria";

async function loadMarcas() {
  await dbConnect();
  const query = await Marca.find({ isActive: true }).sort({
    name: 1,
  });
  return query.map(serializeDocument);
}

async function loadChasis() {
  await dbConnect();
  const query = await Carroceria.find({ isActive: true });
  return query.map(serializeDocument);
}

export default async function ModelsPage() {
  const { userId } = auth();

  if (!userId || !isAdministrator(userId)) {
    return redirect("/");
  }

  const queryMarcas = await loadMarcas();
  const queryChasis = await loadChasis();

  return (
    <>
      <div className="border border-slate-200 rounded-2xl p-4 sticky z-50 top-5 bg-white">
        <div className="flex justify-between mb-5">
          <h2 className="flex items-center gap-1 text-xl md:text-3xl font-headMedium">
            Gestión de Modelos
          </h2>
          <div className="flex items-center justify-between gap-3">
            <BtnAddModel brands={queryMarcas} chasises={queryChasis} />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    <RefreshCw className="w-5 h-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="text-base">Actualizar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <p>Filtros</p>
      </div>
      <ListModels />
    </>
  );
}
