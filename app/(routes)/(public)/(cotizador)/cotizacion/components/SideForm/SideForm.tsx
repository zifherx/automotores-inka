import { Title } from "@/components/Shared/Title";

import { iCardModel } from "@/types";
import { FormularioLead } from "../FormularioLead";

export function SideForm(props: iCardModel) {
  const { model } = props;

  return (
    <div>
      <Title
        title="Cotizando mi nuevo auto"
        className="font-textItalicMedium text-2xl md:text-3xl text-center uppercase"
      />
      <p className="text-center mt-1 text-lg font-textRegular text-grisInka mb-3">
        Estás cotizando en Automotores Inka
      </p>
      <FormularioLead model={model} />
    </div>
  );
}
