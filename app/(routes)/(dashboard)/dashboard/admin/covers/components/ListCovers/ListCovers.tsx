import { CardCover } from "../CardCover";
import { iListCover } from "@/types";

export function ListCovers(props: iListCover) {
  const { covers } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-2 md:p-5">
      {covers.length === 0 ? (
        <p className="text-center text-2xl font-textRegular col-span-4">
          No existen portadas registradas
        </p>
      ) : (
        covers.map((item) => <CardCover key={item._id} cover={item} />)
      )}
    </div>
  );
}
