import { SideForm } from "../SideForm";
import { iCotizacionCero } from "@/types";

export function Cotizador(props: iCotizacionCero) {
  const { brands, listDepartamentos } = props;
  return (
    <div className="mas-w-6xl mx-auto">
      <div className="p-4 md:p-10">
        {/* <div className="p-5 md:p-10 flex flex-col-reverse gap-10 md:grid md:grid-cols-2 border-2 border-purple-500"> */}
        <SideForm brands={brands} listDepartamentos={listDepartamentos} />
        {/* </div> */}
      </div>
    </div>
  );
}
