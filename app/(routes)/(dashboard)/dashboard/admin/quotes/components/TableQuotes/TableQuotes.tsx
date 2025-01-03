"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getGroupedRowModel,
  GroupingState,
  useReactTable,
  ExpandedState,
  getExpandedRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { iLead } from "@/types";
import { Button } from "@/components/ui/button";
import { columnsQuotes } from "@/table-columns";
import {
  Building,
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShoppingBasket,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export function TableQuotes() {
  const [quotes, setQuotes] = useState<iLead[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const getQuotes = async () => {
    try {
      const query = await axios.get("/api/cotizacion");
      if (query.status === 200) {
        setQuotes(query.data.obj);
        setIsDataLoading(false);
      }
    } catch (err) {
      setIsDataLoading(false);
    }
  };

  useEffect(() => {
    getQuotes();
  }, []);

  const table = useReactTable({
    data: quotes,
    columns: columnsQuotes,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGroupingChange: setGrouping,
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      grouping,
      expanded,
    },
  });

  const toggleGrouping = (columnId: string) => {
    setGrouping((prev) => {
      if (prev.includes(columnId)) {
        return prev.filter((id) => id !== columnId);
      } else {
        return [...prev, columnId];
      }
    });
  };

  return (
    <div className="w-full p-2">
      <div className="flex items-center justify-between pb-8">
        <Input
          placeholder="Filtrar por cliente..."
          value={
            (table.getColumn("clienteNombre")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("clienteNombre")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div>
          <Button
            variant="outline"
            size="sm"
            className="ml-4"
            onClick={() => toggleGrouping("ciudad")}
          >
            <Building className="w-5 h-5 mr-2" />
            {grouping.includes("ciudad") ? "Desagrupar" : "Agrupar"} por Ciudad
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="ml-4"
            onClick={() => toggleGrouping("vehiculoModelo")}
          >
            <Car className="w-5 h-5 mr-2" />
            {grouping.includes("vehiculoModelo") ? "Desagrupar" : "Agrupar"} por
            Modelo
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="ml-4"
            onClick={() => toggleGrouping("intencionCompra")}
          >
            <ShoppingBasket className="w-5 h-5 mr-2" />
            {grouping.includes("intencionCompra")
              ? "Desagrupar"
              : "Agrupar"}{" "}
            por Intención de compra
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(({ id, headers }) => (
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
            {table.getRowModel().rows.length ? (
              table
                .getRowModel()
                .rows.map(
                  ({
                    id,
                    getIsSelected,
                    getVisibleCells,
                    getIsExpanded,
                    getToggleExpandedHandler,
                    subRows,
                  }) => (
                    <TableRow
                      key={id}
                      data-state={getIsSelected() && "selected"}
                    >
                      {getVisibleCells().map(
                        ({
                          id,
                          column,
                          getContext,
                          getIsGrouped,
                          getIsAggregated,
                          getIsPlaceholder,
                        }) => (
                          <TableCell key={id}>
                            {getIsGrouped() ? (
                              <>
                                <Button
                                  variant="ghost"
                                  className="mr-2"
                                  onClick={() => {
                                    getToggleExpandedHandler()();
                                  }}
                                >
                                  {getIsExpanded() ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4" />
                                  )}
                                </Button>
                                {flexRender(
                                  column.columnDef.cell,
                                  getContext()
                                )}{" "}
                                ({subRows.length})
                              </>
                            ) : getIsAggregated() ? (
                              flexRender(
                                column.columnDef.aggregatedCell ??
                                  column.columnDef.cell,
                                getContext()
                              )
                            ) : getIsPlaceholder() ? null : (
                              flexRender(column.columnDef.cell, getContext())
                            )}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  )
                )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnsQuotes.length}
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
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionadas.
        </div>
        <div className="flex space-x-2 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex items-center gap-2"
          >
            Siguiente
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
