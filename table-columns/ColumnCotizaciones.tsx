import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

import moment from "moment";
import { Pencil, Trash2 } from "lucide-react";

import { iLead } from "@/types";

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
    accessorFn: (row) => row.cliente.numeroDocumento,
    id: "clienteDocumento",
    header: () => (
      <div className="text-center uppercase font-headBold">Documento</div>
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
    accessorFn: (row) => row.sede.name,
    id: "dealer",
    header: () => (
      <div className="text-center uppercase font-headBold">Dealer</div>
    ),
    cell: ({ getValue }) => {
      const dealer = getValue() as string;
      return <p className="text-center capitalize font-medium">{dealer}</p>;
    },
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
          <Trash2 className="w-5 h-5 text-redInka" />
        </Button>
      </div>
    ),
  },
];

export const COLUMN_DEFINITION_EXPORTING = [
  {
    id: "createdAt",
    label: "Fecha",
    accessor: (row: iLead) => row.createdAt,
  },
  {
    id: "cliente.nombre",
    label: "Cliente",
    accessor: (row: iLead) => row.cliente.name,
  },
  {
    id: "cliente.numeroDocumento",
    label: "Documento",
    accessor: (row: iLead) => row.cliente.numeroDocumento,
  },
  {
    id: "cliente.celular",
    label: "Celular",
    accessor: (row: iLead) => row.cliente.celular,
  },
  {
    id: "cliente.email",
    label: "Email",
    accessor: (row: iLead) => row.cliente.email,
  },
  {
    id: "vehiculo.name",
    label: "Modelo",
    accessor: (row: iLead) => row.vehiculo.name,
  },
  {
    id: "vehiculo.marca.name",
    label: "Marca",
    accessor: (row: iLead) => row.vehiculo.marca.name,
  },
  {
    id: "ciudad",
    label: "Ciudad",
    accessor: (row: iLead) => row.ciudad,
  },
  {
    id: "sede.name",
    label: "Concesionario",
    accessor: (row: iLead) => row.sede.name,
  },
  {
    id: "intencionCompra",
    label: "Intención de Compra",
    accessor: (row: iLead) => row.intencionCompra,
  },
] as const;

export type ColumnQuoteDef = (typeof COLUMN_DEFINITION_EXPORTING)[number];

export const columnsExport: ColumnDef<iLead>[] =
  COLUMN_DEFINITION_EXPORTING.map((col) => ({
    accessorKey: col.id,
    header: col.label,
    cell: ({ row }) => col.accessor(row.original),
  }));
