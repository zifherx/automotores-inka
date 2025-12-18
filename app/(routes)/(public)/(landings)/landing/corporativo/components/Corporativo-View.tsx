"use client";

import { HeroSection } from "./Hero-Section";
import { FormularioSection } from "./Formulario-Section";
import { BeneficiosSecion } from "./Beneficios-Secion";
import { EstadisticasSection } from "./Estadisticas-Section";
import { TrustSection } from "./Trust-Section";

export function CorporativoView() {
  return (
    <div>
      <HeroSection />
      <FormularioSection />
      <BeneficiosSecion />
      <EstadisticasSection />
      <TrustSection />
    </div>
  );
}
