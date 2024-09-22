import { Subtitle } from "@/components/Shared/Subtitle";
import { Title } from "@/components/Shared/Title";

import { ValoresCard } from "../ValoresCard";

export function ValoresSection() {
  const subtitle =
    "Te invitamos a vivir nuestros valores, en cada acción y decisión que tomes";

  return (
    <div className="max-5xl mx-auto p-10 md:p-16">
      <Title
        title="Nuestros Valores"
        className="text-center text-2xl uppercase font-extrabold text-grisDarkInka"
      />
      <Subtitle subtitle={subtitle} />
      <ValoresCard />
    </div>
  );
}
