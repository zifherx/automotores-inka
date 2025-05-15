import { ParrafoSection } from "@/components/Shared/ParrafoSection";
import { Title } from "@/components/Shared/Title";
import { LegalPromocionesData } from "@/data";

export function PromocionLegalView() {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 flex flex-col gap-y-5">
      <Title
        title="Legales Promociones"
        className="text-center text-blueInka text-2xl font-extrabold uppercase"
      />

      {LegalPromocionesData.map(({ id, title, parrafos }) => (
        <ParrafoSection key={id} title={title} parrafos={parrafos} />
      ))}
    </div>
  );
}
