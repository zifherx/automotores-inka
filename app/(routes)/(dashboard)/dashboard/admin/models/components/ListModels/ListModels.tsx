import { iListModels } from "@/types";
import { CardModel } from "../CardModel";

export function ListModels(props: iListModels) {
  const { models } = props;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-2 md:p-3">
      {models.length === 0 ? (
        <p className="text-center text-2xl font-textRegular col-span-4">
          No existen modelos registrados
        </p>
      ) : (
        models.map((item) => <CardModel key={item._id} model={item} />)
      )}
    </div>
  );
}
