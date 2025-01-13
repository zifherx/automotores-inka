import { Title } from "@/components/Shared/Title";
import { CarouselLiquidacion } from "../CarouselLiquidacion";

export function ModelosEnLiquidacion() {
  return (
    <section className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col gap-10">
        <Title
          title="Últimas unidades de liquidación"
          className="text-center text-2xl uppercase font-extrabold text-grisDarkInka"
        />
        <CarouselLiquidacion />
      </div>
    </section>
  );
}
