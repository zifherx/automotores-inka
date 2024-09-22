import { iListSede } from "@/types";
import { CardSucursal } from "../CardSucursal";

export function ListSucursal(props: iListSede) {
  const { sedes } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-2 md:p-5">
      {sedes.length === 0 ? (
        <p className="text-center text-2xl font-textRegular col-span-4">
          No existen marcas registradas
        </p>
      ) : (
        sedes.map((item) => <CardSucursal key={item._id} sede={item} />)
      )}
    </div>
  );
}
