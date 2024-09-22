import { iListBrand } from "@/types";
import { SideForm } from "../SideForm";

export function Cotizador(props: iListBrand) {
  const { brands } = props;
  return (
    <div className="mas-w-6xl mx-auto">
      {/* <div className="p-5 md:p-10 flex flex-col-reverse gap-10 md:grid md:grid-cols-2 border-2 border-purple-500"> */}
      <SideForm brands={brands} />
      {/* </div> */}
    </div>
  );
}
