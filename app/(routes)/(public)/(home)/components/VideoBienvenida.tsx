"use client";

import Link from "next/link";
import { Megaphone } from "lucide-react";

import { VideosYoutube } from "@/components/Shared/VideosYoutube";
import { Button } from "@/components/ui/button";

export interface YoutubeListVideoOptions {
  controles: boolean;
  playlist: string;
  bucle: boolean;
}

export function VideoBienvenida() {
  return (
    <section className="bg-slate-300 w-full bg-[url('/images/fondo-tramado-gris.png')] bg-cover bg-center bg-no-repeat">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[60%,1fr] text-black px-4 py-8 md:px-0 md:py-10">
        <div className="p-0">
          <VideosYoutube
            className="h-[400px]"
            src="https://www.youtube.com/embed/videoseries?si=chW42IabjNVLUOX5&amp;list=PLDz4V31SNkF6NWiW-HR__RJjWy9plIYsh&amp;controls=0&amp;playlist=vwM9Ik-FpMA&amp;loop=1"
            title="Somos el mejor aliado para tu negocio"
          />
        </div>
        <div className="flex flex-col items-start justify-center mt-5 md:ml-8">
          <h2 className="text-xl md:text-2xl font-extrabold md:font-bold mb-3 md:mb-5">
            AUTOMOTORES INKA | SOLUCIONES CORPORATIVAS
          </h2>
          <div className="flex flex-col items-start gap-3 md:gap-4 text-black">
            <p className="text-sm md:text-base text-justify">
              En Automotores IInka brindamos soluciones corporativas de
              transporte diseñadas para empresas que buscan eficiencia, respaldo
              y continuidad operativa.
            </p>
            <p className="text-sm md:text-base text-justify">
              Con más de 14 años de experiencia, nuestro equipo especializado
              acompaña a cada cliente en la elección de la flota ideal,
              ofreciendo asesoría personalizada y soporte postventa,
              consolidándonos como un aliado estratégico para el crecimiento de
              tu negocio.
            </p>
            <button className="bg-blueInka font-headMedium px-2 py-3 rounded-lg text-lg text-white transition-all hover:scale-105 hover:bg-blueDarkInka">
              <Link
                href="/soluciones-corporativas"
                className="flex flex-row items-center justify-center gap-2"
              >
                Solicita tu asesoría corporativa
                <Megaphone className="h-6 w-6 ml-2" strokeWidth={2} />
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
