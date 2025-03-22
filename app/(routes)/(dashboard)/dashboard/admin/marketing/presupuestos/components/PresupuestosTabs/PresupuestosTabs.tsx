"use client";

import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Edit, Eye, Search } from "lucide-react";

import { usePresupuesto } from "@/context/presupuestos/presupuestoContext";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { TableLoading } from "@/components/Shared/TableLoading";
import { EstadoBadge } from "../EstadoBadge";

export type tTabsProps = {
  inputFiltroProp: string;
  setInputFiltroProp: Dispatch<SetStateAction<string>>;
  anioSeleccionado: number;
  setAnioSeleccionado: Dispatch<SetStateAction<number>>;
  mesSeleccionado: number | null;
  setMesSeleccionado: Dispatch<SetStateAction<number | null>>;
};

export const meses = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export function PresupuestosTabs({
  inputFiltroProp,
  anioSeleccionado,
  mesSeleccionado,
}: tTabsProps) {
  const { presupuestos, isLoading } = usePresupuesto();

  if (isLoading) {
    return <TableLoading />;
  }

  const presupuestosFiltrados = presupuestos.filter((a) => {
    const coincideAnio = a.anio === anioSeleccionado;
    const coincideMes = mesSeleccionado === null || a.mes === mesSeleccionado;
    const coincideBusqueda = a.name
      .toLowerCase()
      .includes(inputFiltroProp.toLowerCase());

    return coincideAnio && coincideMes && coincideBusqueda;
  });

  const presupuestosPorMes = meses
    .map((nombre, index) => {
      const mes = index + 1;
      const items = presupuestosFiltrados.filter((a) => a.mes === mes);

      return { nombre, mes, items };
    })
    .filter((grupo) => grupo.items.length > 0);

  return (
    <Tabs defaultValue="cards" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="cards">Vista de Tarjetas</TabsTrigger>
        <TabsTrigger value="meses">Vista por Mes</TabsTrigger>
      </TabsList>

      <TabsContent value="cards" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {presupuestosFiltrados.map((presupuesto) => (
            <motion.div
              key={presupuesto._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden transition-all border-2 rounded-lg hover:shadow-xl">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">
                      {presupuesto.name}
                    </CardTitle>
                    <EstadoBadge estado={presupuesto.estado} />
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {meses[presupuesto.mes - 1]} {presupuesto.anio}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">
                    $ {presupuesto.montoTotal.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3" />
                    Creado el{" "}
                    {presupuesto.fechaRegistro
                      .toLocaleString()
                      .substring(0, 10)}
                  </div>
                  {presupuesto.observaciones && (
                    <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-md">
                      {presupuesto.observaciones}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {presupuesto.estado === "borrador" && (
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4 mr-1" strokeWidth={2} />
                      Editar
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {presupuestosFiltrados.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium">
              No se encontraron presupuestos
            </h3>
            <p className="text-muted-foreground mt-1">
              Intenta cambiar los filtros o crea un nuevo presupuesto
            </p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="meses">
        <div className="space-y-6 p-4">
          {presupuestosPorMes.map((grupo) => (
            <motion.div
              key={grupo.mes}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{grupo.nombre}</h3>
                <Badge variant="outline">{grupo.items.length}</Badge>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {grupo.items.map((presupuesto) => (
                  <Card
                    key={presupuesto._id}
                    className="flex items-center p-4 hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium truncate">
                          {presupuesto.name}
                        </h4>
                        <EstadoBadge estado={presupuesto.estado} />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        ${presupuesto.montoTotal}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
          {presupuestosPorMes.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">
                No hay presupuestos para mostrar
              </h3>
              <p className="text-muted-foreground mt-1">
                Intenta cambiar los filtros o crea un nuevo presupuesto
              </p>
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
