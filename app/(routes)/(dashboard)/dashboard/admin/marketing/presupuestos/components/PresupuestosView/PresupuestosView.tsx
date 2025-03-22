"use client";

import { useEffect, useState } from "react";

import { usePresupuesto } from "@/context/presupuestos/presupuestoContext";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BotonNuevo } from "@/components/Shared/BotonNuevo";
import { BotonRefresh } from "@/components/Shared/BotonRefresh";
import { DashboardTitulo } from "@/components/Shared/DashboardTitulo";

import { FiltrosSection } from "../FiltrosSection";
import { PresupuestosTabs } from "../PresupuestosTabs";
import { iBudget } from "@/types";

export function PresupuestosView() {
  const { isLoading, presupuestos, refreshPresupuestos } = usePresupuesto();
  const [inputBusqueda, setInputBusqueda] = useState("");
  const [anioSeleccionado, setAnioSeleccionado] = useState(2025);
  const [mesSeleccionado, setMesSeleccionado] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPresupuesto, setSelectedPresupuesto] = useState<
    iBudget | undefined
  >(undefined);

  useEffect(() => {
    refreshPresupuestos();
  }, [refreshPresupuestos]);

  const handleCreate = () => {
    setSelectedPresupuesto(undefined);
    setOpenDialog(true);
  };

  return (
    <div className="flex flex-col gap-4 animate-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <DashboardTitulo titulo="Presupuestos" qty={presupuestos.length} />
          <p>Gestiona los presupuestos mensuales de Marketing</p>
        </div>

        <div className="flex justify-between gap-1">
          <BotonNuevo isLoading={isLoading} refreshAction={handleCreate} />
          <BotonRefresh
            isLoading={isLoading}
            refreshAction={refreshPresupuestos}
          />
        </div>
      </div>
      <FiltrosSection
        inputFiltroProp={inputBusqueda}
        setInputFiltroProp={setInputBusqueda}
        anioSeleccionado={anioSeleccionado}
        setAnioSeleccionado={setAnioSeleccionado}
        mesSeleccionado={mesSeleccionado}
        setMesSeleccionado={setMesSeleccionado}
      />
      <PresupuestosTabs
        inputFiltroProp={inputBusqueda}
        setInputFiltroProp={setInputBusqueda}
        anioSeleccionado={anioSeleccionado}
        setAnioSeleccionado={setAnioSeleccionado}
        mesSeleccionado={mesSeleccionado}
        setMesSeleccionado={setMesSeleccionado}
      />
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedPresupuesto ? "Editar Presupuesto" : "Nuevo Presupuesto"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription />
        </DialogContent>
      </Dialog>
    </div>
  );
}
