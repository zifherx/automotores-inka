"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { FaFileExcel } from "react-icons/fa";

import { useQuotes } from "@/context/quotes/quotesContext";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TableQuotes } from "../TableQuotes";

import { ColumnQuoteDef } from "@/table-columns";
import { onToast } from "@/lib";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

export function CotizacionesView() {
  const { refreshQuotes, exportToExcel, columns } = useQuotes();
  const [selectedColumns, setSelectedColumns] = useState<ColumnQuoteDef[]>([]);
  const [isExportOpen, setIsExportOpen] = useState(false);

  const handleColumnToggle = (column: ColumnQuoteDef) => {
    setSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col.id !== column.id)
        : [...prev, column]
    );
  };

  const handleExport = () => {
    if (selectedColumns.length > 0) {
      exportToExcel(selectedColumns);
      setIsExportOpen(false);
      setSelectedColumns([]);
    } else {
      onToast("Error", "Debe seleccionar al menos 1 columna", true);
    }
  };

  return (
    <div className="p-2">
      <div className="flex justify-between mb-3">
        <h2 className="text-xl md:text-3xl font-headMedium">
          Gestión de Cotizaciones
        </h2>
        <div className="flex justify-end gap-1">
          <Dialog open={isExportOpen} onOpenChange={setIsExportOpen}>
            <DialogTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button variant="outline" size="icon">
                      <FaFileExcel className="w-6 h-6 text-green-600" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-base">
                    <p>Exportar XLSX</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Exportar a Excel</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  {columns.map((column) => (
                    <div
                      key={column.id}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={column.id}
                        checked={selectedColumns.some(
                          (col) => col.id === column.id
                        )}
                        onCheckedChange={() => handleColumnToggle(column)}
                      />
                      <label
                        htmlFor={column.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {column.label}
                      </label>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full"
                  onClick={handleExport}
                  disabled={selectedColumns.length === 0}
                >
                  Exportar {selectedColumns.length} columna(s)
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => refreshQuotes()}
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
      <TableQuotes />
    </div>
  );
}
