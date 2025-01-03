/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { ArrowRight } from "lucide-react";

import { getEmailFromResend } from "@/app/api/actions";
import { iCustomMessage } from "@/types";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CustomMessage(props: iCustomMessage) {
  const { message, volverInicio } = props;

  const [email, setEmail] = useState("");

  const getEmailCliente = async () => {
    const query = await getEmailFromResend(message);
    if (query?.email !== undefined) {
      setEmail(query.email);
    }
  };

  useEffect(() => {
    getEmailCliente();
  }, [message]);

  // async function getCustomerMail() {
  //   const query = await getEmailFromResend(message);

  //   if (query?.email !== undefined) {
  //     setEmail(query.email);
  //   }
  // }

  // getCustomerMail();

  return (
    <div className="max-w-2xl w-full mx-auto bg-white rounded-t-2xl shadow-lg transform transition-all hover:scale-105 duration-300 overflow-hidden">
      <Image
        src="/images/gracias-handshake.jpg"
        alt="Gracias por cotizar"
        width={900}
        height={600}
        className="object-cover w-full h-[300px] rounded-t-2xl"
      />
      <div className="py-8 px-14 text-center">
        {/* <Car className="w-24 h-24 mx-auto text-black mb-4" /> */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          ¡Gracias por tu cotización!
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Hemos recibido tu solicitud de cotización. Nuestro equipo la revisará
          y te contactará pronto con los detalles.
        </p>
        <p className="text-sm text-gray-500">
          En breve nos pondremos en contacto contigo al correo suministrado{" "}
          {email}
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
          ¿Tienes preguntas? Llámanos al 972-051-479
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
