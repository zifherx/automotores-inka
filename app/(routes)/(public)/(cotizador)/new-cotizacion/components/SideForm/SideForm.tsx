import { Title } from "@/components/Shared/Title";
import { FormCotizacion } from "../Form-Cotizacion";

export function SideForm() {
  return (
    <>
      <Title
        title="Cotiza tu nuevo auto"
        className="font-headMedium text-2xl md:text-4xl text-center uppercase"
      />
      <p className="text-center text-sm md:text-lg font-textRegular text-grisInka">
        Estás cotizando en Automotores Inka
      </p>
      <FormCotizacion />
    </>
  );
}
