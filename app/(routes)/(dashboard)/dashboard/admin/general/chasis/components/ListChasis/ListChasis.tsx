import { CardChasis } from "../CardChasis";
import { iListChasis } from "@/types";

export function ListChasis({ chasises }: iListChasis) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-2">
      {chasises.length === 0 ? (
        <p className="text-center text-2xl font-textRegular col-span-4">
          No existen chasis registrados
        </p>
      ) : (
        chasises.map((item) => <CardChasis key={item._id} chasis={item} />)
      )}
    </div>
  );
}
