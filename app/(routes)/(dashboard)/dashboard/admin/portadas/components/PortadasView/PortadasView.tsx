"use client";

import { useEffect, useState } from "react";

import { useCovers } from "@/context/covers/coverContext";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DashboardTitulo } from "@/components/Shared/DashboardTitulo";
import { BotonRefresh } from "@/components/Shared/BotonRefresh";
import { BotonNuevo } from "@/components/Shared/BotonNuevo";

import { FormPortada } from "../FormPortada";
import { TablePortadas } from "../TablePortadas";

import { iPortada } from "@/types";

export function PortadasView() {
  const { refreshCovers, isLoading, covers } = useCovers();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPortada, setSelectedPortada] = useState<iPortada | undefined>(
    undefined
  );

  useEffect(() => {
    refreshCovers();
  }, [refreshCovers]);

  const handleCreate = () => {
    setSelectedPortada(undefined);
    setOpenDialog(true);
  };

  const handleUpdate = (portada: iPortada) => {
    setSelectedPortada(portada);
    setOpenDialog(true);
  };

  const handleFormSubmit = () => {
    setOpenDialog(false);
    refreshCovers();
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <DashboardTitulo titulo="Gestión de Portadas" qty={covers.length} />
        <div className="flex justify-between gap-1">
          <BotonNuevo isLoading={isLoading} refreshAction={handleCreate} />
          <BotonRefresh isLoading={isLoading} refreshAction={refreshCovers} />
        </div>
      </div>
      <TablePortadas onEdit={handleUpdate} />
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-xl">
              {selectedPortada ? "Editar Portada" : "Nueva Portada"}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription />
          <FormPortada portada={selectedPortada} onSubmit={handleFormSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
