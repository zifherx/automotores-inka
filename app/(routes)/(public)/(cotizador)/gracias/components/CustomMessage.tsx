/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { iCustomMessage } from "@/types";

export function CustomMessage({
  volverInicio,
  celular,
  customer,
}: iCustomMessage) {
  return (
    <div className="max-w-2xl w-full mx-auto bg-white rounded-t-2xl shadow-lg transform transition-all hover:scale-105 duration-300 overflow-hidden">
      <Image
        src="/images/gracias-handshake.jpg"
        alt="Gracias por cotizar"
        width={900}
        height={600}
        className="object-cover w-full h-[300px] rounded-t-2xl"
      />
      <div className="py-6 px-8 text-center">
        <h1 className="text-3xl font-headBold text-gray-800 mb-4">
          ¡Gracias {customer} por tu cotización!
        </h1>
        <p className="text-xl text-gray-600 font-headLight mb-4">
          Hemos recibido tu solicitud de cotización. Nuestro equipo la revisará
          y te contactará pronto con los detalles.
        </p>
        <p className="text-sm font-textMedium text-gray-500">
          En breve nos pondremos en contacto contigo al celular suministrado{" "}
          <span className="font-bold">{celular}</span>
        </p>

        <div className="flex justify-center mt-8">
          <Button
            className="bg-gray-800 hover:bg-gray-700 text-white"
            onClick={volverInicio}
          >
            Volver al inicio
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="bg-gray-300 px-8 py-4">
        <p className="text-sm text-gray-600 text-center">
          ¿Tienes preguntas? Llámanos al{" "}
          <a className="hover:text-blueInka" href="tel:972051479">
            972-051-479
          </a>
        </p>
      </div>
      <div className="mt-8 flex space-x-4 p-3 justify-center">
        <div className="w-16 h-1 bg-gray-300 rounded-full"></div>
        <div className="w-16 h-1 bg-gray-500 rounded-full"></div>
        <div className="w-16 h-1 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
}
