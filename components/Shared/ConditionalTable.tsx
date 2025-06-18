import { cn, formatPENPriceTable, formatUSDPrice } from "@/lib";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { TableConditionalProps } from "@/types";

export function ConditionalTable({ tHead, tBody }: TableConditionalProps) {
  return (
    <Table className="my-5 text-xs">
      <TableCaption>
        Lista de Bonos de descuento - Campaña Ahorra o Nunca Jun/Jul 2025
      </TableCaption>
      <TableHeader className="bg-black">
        <TableRow>
          {tHead.map(({ cell, id }) => (
            <TableHead
              key={id}
              className={cn("text-white text-center", id > 5 && "w-[120px]")}
            >
              {cell}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tBody.map(
          ({
            id,
            marca,
            anioModelo,
            modelo,
            version,
            precioUSD,
            precioSOLES,
            bonoMarca_USD,
            bonoRetoma_USD,
            bonoFinanciamiento_USD,
          }) => (
            <TableRow key={id}>
              <TableCell className="text-left">{marca}</TableCell>
              <TableCell className="text-center">{anioModelo}</TableCell>
              <TableCell className="text-left w-[100px]">{modelo}</TableCell>
              <TableCell className="text-left w-[130px]">{version}</TableCell>
              <TableCell className="text-center">
                {formatUSDPrice(precioUSD)}
              </TableCell>
              <TableCell className="text-center">
                {formatPENPriceTable(precioSOLES)}
              </TableCell>
              <TableCell className="text-center">
                {bonoMarca_USD === 0
                  ? "No Aplica"
                  : formatUSDPrice(bonoMarca_USD)}
              </TableCell>
              <TableCell className="text-center">
                {bonoRetoma_USD === 0
                  ? "No Aplica"
                  : formatUSDPrice(bonoRetoma_USD)}
              </TableCell>
              <TableCell className="text-center">
                {bonoFinanciamiento_USD === 0
                  ? "No Aplica"
                  : formatUSDPrice(bonoFinanciamiento_USD)}
              </TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
