import { iLead } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columnsQuotes: ColumnDef<iLead>[] = [
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
    accessorKey: "createdAt",
    header: () => (
      <div className="text-center uppercase font-headBold">Fecha</div>
    ),
    cell: ({ row }) => (
      <p className="text-center text-sm">
        {moment(row.getValue("createdAt")).format("L")}{" "}
        {moment(row.getValue("createdAt")).format("LT")}
      </p>
    ),
  },
  {
    accessorFn: (row) => row.cliente.name,
    id: "clienteNombre",
    header: () => (
      <div className="text-center uppercase font-headBold">Cliente</div>
    ),
    cell: ({ getValue }) => {
      const customer = getValue() as string;
      return <p className="text-center capitalize font-medium">{customer}</p>;
    },
  },
  {
    accessorKey: "ciudad",
    header: () => (
      <div className="text-center uppercase font-headBold">Ciudad</div>
    ),
    cell: ({ row }) => <p className="text-center">{row.getValue("ciudad")}</p>,
    enableGrouping: true,
  },
  {
    accessorFn: (row) => row.vehiculo.name,
    id: "vehiculoModelo",
    header: () => (
      <div className="text-center uppercase font-headBold">Vehículo</div>
    ),
    cell: ({ getValue }) => {
      const vehicle = getValue() as string;
      return <p className="text-center capitalize font-medium">{vehicle}</p>;
    },
    enableGrouping: true,
  },
  {
    accessorKey: "intencionCompra",
    header: () => (
      <div className="text-center uppercase font-headBold">
        Intención de Compra
      </div>
    ),
    cell: ({ row }) => (
      <p className="text-center capitalize text-sm">
        {String(row.getValue("intencionCompra")).replace(/-/g, " ")}
      </p>
    ),
    enableGrouping: true,
  },
  {
    accessorKey: "action",
    header: () => (
      <div className="text-center uppercase font-headBold">Acción</div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-between">
        <Button
          variant="link"
          size="sm"
          onClick={() => console.log("Update:", row.original._id)}
        >
          <Pencil className="w-5 h-5 text-orange-500" />
        </Button>
        <Button
          variant="link"
          size="sm"
          onClick={() => console.log("Delete:", row.original._id)}
        >
          <Trash2 className="w-5 h-5 text-purple-500" />
        </Button>
      </div>
    ),
  },
];
