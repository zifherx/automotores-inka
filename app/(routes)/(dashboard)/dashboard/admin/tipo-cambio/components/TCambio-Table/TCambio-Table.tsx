"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { FooterPaginationTable } from "@/components/Shared/FooterPaginationTable";

import { iExchange } from "@/types";
import { columnTCambio } from "@/table-columns";

export function TCambioTable() {
  const [tiposCambio, setTiposCambio] = useState<iExchange[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const getTCambio = async () => {
    try {
      const query = await axios.get("/api/tipo-cambio");
      if (query.status === 200) {
        setTiposCambio(query.data.obj);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTCambio();
  }, []);

  const tableExchange = useReactTable({
    data: tiposCambio,
    columns: columnTCambio,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  return (
    <div className="w-full p-2">
      <div className="flex items-center justify-between pb-8">
        Filtro de input:text
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {tableExchange.getHeaderGroups().map(({ id, headers }) => (
              <TableRow key={id}>
                {headers.map(({ id, isPlaceholder, column, getContext }) => (
                  <TableHead key={id}>
                    {isPlaceholder
                      ? null
                      : flexRender(column.columnDef.header, getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {tableExchange.getRowModel().rows.length ? (
              tableExchange
                .getRowModel()
                .rows.map(({ id, getIsSelected, getVisibleCells, subRows }) => (
                  <TableRow key={id} data-state={getIsSelected() && "selected"}>
                    {getVisibleCells().map(
                      ({
                        id,
                        column,
                        getContext,
                        getIsAggregated,
                        getIsPlaceholder,
                      }) => (
                        <TableCell key={id}>
                          {flexRender(column.columnDef.cell, getContext())}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnTCambio.length}
                  className="h-24 text-center"
                >
                  No hay registros
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {tableExchange.getFilteredSelectedRowModel().rows.length} de{" "}
          {tableExchange.getFilteredRowModel().rows.length} fila(s)
          seleccionadas.
        </div>
        <FooterPaginationTable
          paginaAnterior={tableExchange.previousPage}
          paginaSiguiente={tableExchange.nextPage}
          getPaginaAnterior={tableExchange.getCanPreviousPage}
          getPaginaSiguiente={tableExchange.getCanNextPage}
        />
      </div>
    </div>
  );
}
