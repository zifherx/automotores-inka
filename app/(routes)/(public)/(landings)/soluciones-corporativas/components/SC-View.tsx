"use client";

import Image from "next/image";
import { Beneficios } from "./Beneficios";
import { FormularioCorporativo } from "./Formulario-Corporativo";
import { FooterCorporativo } from "./Footer-Corporativo";

export function SolucionesCorporativasView() {
  return (
    <div className="min-h-screen">
      <section
        id="hero-section"
        className="w-full relative h-96 md:h-[920px] overflow-hidden"
      >
        <Image
          src="/images/corporativo/hero-banner-degrade.png"
          alt="Banner Corporativo"
          fill
          className="object-cover md:w-full"
          priority
        />

        <div className="absolute inset-0 flex items-start justify-center pt-8 md:mt-12">
          <div className="md:max-w-6xl md:mx-auto text-center">
            <h1 className="font-headBold text-blueInka text-lg sm:text-xl md:text-5xl">
              Automotores Inka |
              <span className="font-textMedium"> Soluciones Corporativas</span>
            </h1>
          </div>
        </div>
      </section>

      <section
        id="nosotros-section"
        className="w-full relative py-16 md:py-32 min-h-52"
      >
        <Image
          src="/images/corporativo/banner-institucional.png"
          alt="Banner Institucional"
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-blueInka opacity-80"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-12 flex items-center justify-center h-full">
          <div className="text-center">
            <p className="text-white text-sm md:text-2xl leading-snug font-textRegular">
              En <strong className="font-textBold">Automotores Inka</strong>{" "}
              brindamos soluciones corporativas flexibles que se adaptan a la
              operación de tu empresa. Acompañamos la gestión de tu flota con
              atención coordinada, respaldo oportuno y servicios diseñados para
              optimizar tiempos y asegurar la continuidad de tu negocio.
            </p>
          </div>
        </div>
      </section>

      <Beneficios />
      <FormularioCorporativo />
      <FooterCorporativo />
    </div>
  );
}
