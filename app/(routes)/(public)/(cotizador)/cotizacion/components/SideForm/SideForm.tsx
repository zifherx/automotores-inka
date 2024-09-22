import { Title } from "@/components/Shared/Title";

import { iSideFormMarca } from "@/types";
import { FormularioLead } from "../FormularioLead";

export function SideForm(props: iSideFormMarca) {
  const { model, listDepartamentos } = props;

  return (
    <div className="p-2">
      <Title
        title="Cotizando mi auto"
        className="font-textItalicMedium text-3xl text-center uppercase"
      />
      <p className="text-center mt-1 text-lg font-textRegular text-grisInka mb-5">
        Estás cotizando en Automotores Inka
      </p>
      <FormularioLead model={model} listDepartamentos={listDepartamentos} />
    </div>
  );
}
