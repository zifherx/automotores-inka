import { ParrafoSection } from "@/components/Shared/ParrafoSection";
import { Title } from "@/components/Shared/Title";
import { PromoAhorroNuncaData } from "@/data";

export function AhorroNuncaSection() {
  return (
    <section>
      <Title
        title="¡Ahorro o Nunca - Junio/Julio 2025!"
        className="text-blueInka mb-4 text-lg text-left font-extrabold"
      />

      <div className="space-y-4">
        {PromoAhorroNuncaData.map(({ parrafos, title, id }) => (
          <ParrafoSection key={id} title={title} parrafos={parrafos} />
        ))}
      </div>
    </section>
  );
}
