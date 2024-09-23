import { Title } from "@/components/Shared/Title";
import { FormCotizacion } from "../Form-Cotizacion";
import { iCotizacionCero } from "@/types";

export function SideForm(props: iCotizacionCero) {
  const { brands, listDepartamentos } = props;

  return (
    <div>
      <Title
        title="Cotiza tu auto"
        className="font-headMedium text-4xl text-center uppercase"
      />
      <p className="text-center mt-3 text-lg font-textRegular text-grisInka">
        Estás cotizando en Automotores Inka
      </p>
      <FormCotizacion brands={brands} listDepartamentos={listDepartamentos} />
    </div>
  );
}
