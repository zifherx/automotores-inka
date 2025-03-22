"use client";

import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

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

import { Button } from "@/components/ui/button";
import { columnsQuotes } from "@/table-columns";
import {
  Building,
  CalendarIcon,
  Car,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ShoppingBasket,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useQuotes } from "@/context/quotes/quotesContext";

export function TableQuotes() {
  const { quotes, isLoading, rangoFechas, setRangoFechas } = useQuotes();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [grouping, setGrouping] = useState<GroupingState>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});

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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!quotes || quotes.length === 0) {
    return <p>No existen registros</p>;
  }

  return (
    <div className="w-full p-2">
      <div className="flex flex-col gap-2 pb-4">
        <div className="flex flex-col md:flex-row md:justify-between w-full">
          <div className="flex flex-col gap-1">
            <label htmlFor="rangoFecha" className="font-headMedium">
              Fechas
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="rangoFechas"
                  variant="outline"
                  className="w-full md:w-[300px] justify-start text-left font-normal"
                >
                  <CalendarIcon />
                  {rangoFechas?.from ? (
                    rangoFechas.to ? (
                      <>
                        {format(rangoFechas.from, "LLLL dd, y", { locale: es })}{" "}
                        - {format(rangoFechas.to, "LLLL dd, y", { locale: es })}
                      </>
                    ) : (
                      format(rangoFechas.from, "LLL dd, y", { locale: es })
                    )
                  ) : (
                    <span>Selecciona un rango de fechas</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={rangoFechas?.from}
                  selected={rangoFechas}
                  onSelect={setRangoFechas}
                  numberOfMonths={2}
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="inputCliente" className="font-headMedium">
              Cliente
            </label>
            <Input
              placeholder="Filtrar por cliente..."
              className="w-full md:w-[300px] justify-start text-left font-normal"
              value={
                (table
                  .getColumn("clienteNombre")
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn("clienteNombre")
                  ?.setFilterValue(event.target.value)
              }
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start justify-start md:justify-end gap-1 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleGrouping("ciudad")}
          >
            <Building className="w-5 h-5 mr-2" />
            {grouping.includes("ciudad") ? "Desagrupar" : "Agrupar"} por Ciudad
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleGrouping("vehiculoModelo")}
          >
            <Car className="w-5 h-5 mr-2" />
            {grouping.includes("vehiculoModelo") ? "Desagrupar" : "Agrupar"} por
            Modelo
          </Button>

          <Button
            variant="outline"
            size="sm"
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
