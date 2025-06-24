import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";

import { iAppointment } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";

export const columnsCitas: ColumnDef<iAppointment>[] = [
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
  //   {
  //     accessorFn: (row) => row.cliente.tipoDocumento,
  //     id: "tipoDocumento",
  //     header: () => (
  //       <div className="text-center uppercase font-headBold">Tipo Documento</div>
  //     ),
  //     cell: ({ getValue }) => {
  //       const typeDocumentCustomer = getValue() as string;
  //       return (
  //         <p className="text-center capitalize font-medium">
  //           {typeDocumentCustomer}
  //         </p>
  //       );
  //     },
  //   },
  //   {
  //     accessorFn: (row) => row.cliente.numeroDocumento,
  //     id: "numeroDocumento",
  //     header: () => (
  //       <div className="text-center uppercase font-headBold">N° Documento</div>
  //     ),
  //     cell: ({ getValue }) => {
  //       const nroDocumentoCustomer = getValue() as string;
  //       return (
  //         <p className="text-center capitalize font-medium">
  //           {nroDocumentoCustomer}
  //         </p>
  //       );
  //     },
  //   },
  {
    accessorFn: (row) => row.cliente.celular,
    id: "celularCustomer",
    header: () => (
      <div className="text-center uppercase font-headBold">N° Celular</div>
    ),
    cell: ({ getValue }) => {
      const nroCelularCustomer = getValue() as string;
      return (
        <p className="text-center capitalize font-medium">
          {nroCelularCustomer}
        </p>
      );
    },
  },
  {
    accessorKey: "kilometraje",
    header: () => (
      <div className="text-center uppercase font-headBold">Km.</div>
    ),
    cell: ({ row }) => (
      <p className="text-center capitalize text-sm">
        {String(row.getValue("kilometraje")).replace(/-/g, " ")}
      </p>
    ),
    enableGrouping: true,
  },
  {
    accessorKey: "placa",
    header: () => (
      <div className="text-center uppercase font-headBold">Placa</div>
    ),
    cell: ({ row }) => (
      <p className="text-center capitalize text-sm">
        {String(row.getValue("placa")).replace(/-/g, " ")}
      </p>
    ),
    enableGrouping: true,
  },
  {
    accessorFn: (row) => row.modelo.name,
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
    accessorFn: (row) => row.concesionario.ciudad,
    id: "ciudad",
    header: () => (
      <div className="text-center uppercase font-headBold">Ciudad</div>
    ),
    cell: ({ row }) => <p className="text-center">{row.getValue("ciudad")}</p>,
    enableGrouping: true,
  },
  {
    accessorFn: (row) => row.concesionario.name,
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
    accessorKey: "tipoServicio",
    header: () => (
      <div className="text-center uppercase font-headBold">
        Tipo de Servicio
      </div>
    ),
    cell: ({ row }) => (
      <p className="text-center capitalize text-sm">
        {String(row.getValue("tipoServicio")).replace(/-/g, " ")}
      </p>
    ),
    enableGrouping: true,
  },
  {
    accessorKey: "comentario",
    header: () => (
      <div className="text-center uppercase font-headBold">Observación</div>
    ),
    cell: ({ row }) => (
      <p className="text-center capitalize text-sm">
        {String(row.getValue("comentario")).replace(/-/g, " ")}
      </p>
    ),
    enableGrouping: true,
  },
];
