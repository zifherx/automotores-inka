import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDateToPeru } from "@/lib";
import { iExchange } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";

export const columnTCambio: ColumnDef<iExchange>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fecha",
    header: () => (
      <div className="text-center uppercase font-headBold">Fecha</div>
    ),
    cell: ({ row }) => (
      <p className="text-center text-sm">{row.original.fechaTC}</p>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "tipo_cambio",
    header: () => (
      <div className="text-center uppercase font-headBold">Tipo de Cambio</div>
    ),
    cell: ({ row }) => (
      <p className="text-center">$ {row.getValue("tipo_cambio")}</p>
    ),
  },
  {
    accessorKey: "fechaCreado",
    header: () => (
      <div className="text-center uppercase font-headBold">CreatedAt</div>
    ),
    cell: ({ row }) => (
      <p className="text-center text-sm">
        {formatDateToPeru(new Date(row.original.fechaCreado))}
      </p>
    ),
    enableSorting: true,
  },
  {
    accessorKey: "action",
    header: () => (
      <div className="text-center uppercase font-headBold">Acción</div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center gap-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log("Update:", row.original._id)}
        >
          <Pencil className="w-5 h-5 text-orange-500" strokeWidth={2} />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => console.log("Delete:", row.original._id)}
        >
          <Trash className="w-5 h-5 text-redInka" />
        </Button>
      </div>
    ),
  },
];
