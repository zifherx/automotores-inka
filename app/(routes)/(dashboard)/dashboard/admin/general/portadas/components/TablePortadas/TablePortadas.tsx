import { Edit, Trash } from "lucide-react";

import { useCovers } from "@/context/covers/coverContext";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TableLoading } from "@/components/Shared/TableLoading";

import { tTableGenericProps } from "@/types";

export function TablePortadas({ onEdit }: tTableGenericProps) {
  const { covers, isLoading, deleteCover, refreshCovers } = useCovers();

  if (isLoading) {
    return <TableLoading />;
  }

  if (!covers || covers.length === 0) {
    return <p className="w-full text-center">No se encontraron portadas</p>;
  }

  const handleDelete = async (id: string) => {
    await deleteCover(id);
    refreshCovers();
  };

  return (
    <Table className="w-full border-2 rounded-lg">
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {covers.map((cover) => (
          <TableRow key={cover._id}>
            <TableCell>{cover.name}</TableCell>
            <TableCell>{cover.slug}</TableCell>
            <TableCell>
              {cover.isActive ? "Activo 👍" : "Inactivo 👎"}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(cover)}
                >
                  <Edit className="w-5 h-5" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-sm hover:bg-redInka hover:text-white"
                    >
                      <Trash className="w-5 h-5" strokeWidth={2} />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        ¿Estás absolutamente seguro?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto eliminará
                        permanentemente su artículo y eliminará sus datos de
                        nuestros servidores.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        onClick={() => console.log("No hace nada")}
                      >
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(cover._id)}
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
