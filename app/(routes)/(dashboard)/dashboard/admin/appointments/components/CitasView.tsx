"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

import { TableCitas } from "./TableCitas";

import { ColumnQuoteDef } from "@/table-columns";
import { useCitas } from "@/context/citas/citasContext";
import { onToast } from "@/lib";
import { FaFileExcel } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function CitasView() {
  const { refreshCitas, exportToExcel } = useCitas();

  const handleExport = () => {
    exportToExcel();
  };

  return (
    <div className="p-2">
      <div className="flex justify-between mb-3">
        <h2 className="text-xl md:text-3xl font-headMedium">
          Gestión de Citas de Servicio
        </h2>
        <div className="flex justify-end gap-1">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon">
                <FaFileExcel className="w-6 h-6 text-green-600" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Confirmar exportación de datos?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  ¿Deseas proceder con la exportación? Se creará un archivo
                  descargable con los datos actuales. Esta acción no se puede
                  deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleExport}>
                  Continuar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => refreshCitas()}
                >
                  <RefreshCw className="w-6 h-6" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-base">
                <p>Actualizar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <TableCitas />
    </div>
  );
}
