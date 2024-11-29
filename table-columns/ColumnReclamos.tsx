import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCompanyByCode, switchRS } from "@/lib";
import { makePDFReclamo } from "@/lib/makePdf";
import { iReclamation, tClaimAll } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { FileText, Trash } from "lucide-react";
import moment from "moment";

const downloadClaimPDF = (params: iReclamation) => {
  const typeClaim: tClaimAll = {
    // General
    numeroReclamo: params.numeroReclamo,
    fecha: params.fecha,
    hora: params.hora,
    sedeCodexHR: params.sedeDealer.codexHR,
    sedeCompra: params.sedeDealer.name,
    razonSocial: getCompanyByCode(params.numeroReclamo)!.razonSocial,
    rucEmpresa: getCompanyByCode(params.numeroReclamo)!.ruc,
    direccionSede: params.sedeDealer.address,
    // Cliente
    nombres: params.nombres,
    apellidos: params.apellidos,
    tipoDocumento: params.tipoDocumento,
    isConforme: params.isConforme, //no es obligatorio
    numeroDocumento: params.numeroDocumento,
    celular: params.celular,
    email: params.email,
    direccion: params.direccion,
    distrito: params.distrito,
    provincia: params.provincia,
    departamento: params.departamento,
    direccionCliente: `${params.direccion}, ${params.distrito}, ${params.provincia}, ${params.departamento}`,
    // Reclamo
    tipoBien: params.tipoBien,
    vin: params.vin,
    placa: params.placa,
    descripcionBien: params.descripcionBien,
    moneda: params.moneda,
    importeBien: params.importeBien,
    tipoSolicitud: params.tipoSolicitud,
    detalleSolicitud: params.detalleSolicitud,
    pedidoSolicitud: params.pedidoSolicitud,
  };
  // console.log("Reclamo: ", typeClaim);
  return makePDFReclamo(typeClaim);
};

export const columnsClaims: ColumnDef<iReclamation>[] = [
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
    accessorFn: (row) => row.numeroReclamo,
    id: "numeroReclamo",
    header: () => (
      <div className="text-center uppercase font-headBold">N° Reclamo</div>
    ),
    cell: ({ getValue }) => {
      const nroReclamo = getValue() as string;
      return <p className="text-center capitalize font-medium">{nroReclamo}</p>;
    },
  },
  {
    accessorFn: (row) => `${row.nombres} ${row.apellidos}`,
    id: "titular",
    header: () => (
      <div className="text-left uppercase font-headBold">Titular</div>
    ),
    cell: ({ getValue }) => {
      const titular = getValue() as string;
      return <p className="text-left capitalize font-medium">{titular}</p>;
    },
  },
  {
    accessorKey: "sedeCompra",
    header: () => (
      <div className="text-center uppercase font-headBold">Sede Codex</div>
    ),
    cell: ({ row }) => (
      <p className="text-center uppercase">{row.getValue("sedeCompra")}</p>
    ),
    enableGrouping: true,
  },
  {
    accessorFn: (row) => row.sedeDealer.name,
    id: "sedeDealer",
    header: () => (
      <div className="text-center uppercase font-headBold">Concesionario</div>
    ),
    cell: ({ getValue }) => {
      const sedeDealer = getValue() as string;
      return <p className="text-center capitalize font-medium">{sedeDealer}</p>;
    },
  },
  {
    accessorKey: "action",
    header: () => (
      <div className="text-center uppercase font-headBold">Acción</div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-between">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="link"
                size="sm"
                onClick={() => {
                  // console.log("Original:", row.original);
                  downloadClaimPDF(row.original);
                }}
              >
                <FileText className="w-5 h-5 text-orange-500" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-base">
              <p>Exportar PDF</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="link"
                size="sm"
                onClick={() => console.log("Delete:", row.original._id)}
              >
                <Trash className="w-5 h-5 text-red-800" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-base">
              <p>Exportar PDF</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    ),
  },
];
