import { Title } from "@/components/Shared/Title";
import { FormCotizacion } from "../Form-Cotizacion";

export function SideForm() {
  return (
    <div>
      <Title
        title="Cotiza tu nuevo auto"
        className="font-headMedium text-4xl text-center uppercase"
      />
      <p className="text-center mt-3 text-lg font-textRegular text-grisInka">
        Estás cotizando en Automotores Inka
      </p>
      <FormCotizacion />
    </div>
  );
}
