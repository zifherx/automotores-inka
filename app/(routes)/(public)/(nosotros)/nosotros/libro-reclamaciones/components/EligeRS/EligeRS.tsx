"use client";

import { RevealElement } from "@/components/Shared/RevealElement";
import { Title } from "@/components/Shared/Title";
import { listRSReclamos } from "@/data/public.data";

import { Scale } from "lucide-react";
import { useRouter } from "next/navigation";

export function EligeRS() {
  const router = useRouter();

  return (
    <div className="bg-slate-200/50">
      <div className="max-w-6xl min-h-fit mx-auto">
        <div className="py-8 md:py-16 px-14 md:px-28">
          <Title
            title="Elige tu Razón Social"
            className="uppercase text-4xl font-headMedium text-center mb-3"
          />
          <p className="text-center text-sm text-gray-500 mb-10">
            Revisa tu comprobante de pago y selecciona la razón social para
            ingresar tu reclamo.
          </p>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
            {listRSReclamos.map(({ id, name, ruta }) => (
              <RevealElement key={id} position="bottom" className="flex flex-col items-center">
                <div 
                className="bg-white text-center shadow-xl w-full h-[220px] md:h-[350px] lg:w-[450px] p-8 lg:p-16 rounded-lg cursor-pointer transform transition-all hover:scale-105 duration-300"
                    onClick={() => router.push(`/nosotros/libro-reclamaciones/${ruta}`)}
                >
                  <Scale className="w-12 h-12 md:w-24 md:h-24 text-blueInka mb-4 mx-auto" />
                  <p className="text-xl md:text-3xl font-bold text-gray-800 max-w-[250px] mx-auto">{name}</p>
                </div>
              </RevealElement>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
