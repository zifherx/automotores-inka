import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { iUser } from "@/interfaces/iAdmin";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

export const columnsUsers: ColumnDef<iUser>[] = [
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
    accessorKey: "imageUrl",
    header: () => (
      <div className="text-center uppercase font-headBold">Avatar</div>
    ),
    cell: ({ row }) => (
      <div>
        <Image
          className="rounded-full"
          src={row.getValue("imageUrl")}
          alt={`Avatar ${row.original.username}`}
          width={40}
          height={40}
        />
      </div>
    ),
  },
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    id: "fullname",
    header: () => (
      <div className="text-center uppercase font-headBold">Empleado</div>
    ),
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return <p className="text-center capitalize font-medium">{value}</p>;
    },
  },
  {
    accessorKey: "email",
    header: () => (
      <div className="text-left uppercase font-headBold">Email</div>
    ),
    cell: ({ row }) => (
      <p className="text-left font-medium">{row.getValue("email")}</p>
    ),
  },
  {
    accessorKey: "username",
    header: () => (
      <div className="text-center uppercase font-headBold">Usuario</div>
    ),
    cell: ({ row }) => (
      <p className="text-center font-medium">{row.getValue("username")}</p>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => (
      <div className="text-center uppercase font-headBold">Creado</div>
    ),
    cell: ({ row }) => (
      <p className="text-center font-medium">
        {new Date(row.getValue("createdAt")).toLocaleString()}
      </p>
    ),
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
          onClick={() => console.log("Update:", row.original.id)}
        >
          <Pencil className="w-5 h-5 text-orange-500" />
        </Button>
        <Button
          variant="link"
          size="sm"
          onClick={() => console.log("Delete:", row.original.id)}
        >
          <Trash2 className="w-5 h-5 text-purple-500" />
        </Button>
      </div>
    ),
  },
];
