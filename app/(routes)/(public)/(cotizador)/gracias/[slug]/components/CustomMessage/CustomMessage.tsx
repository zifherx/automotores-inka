import { useState } from "react";

import { HeartHandshake } from "lucide-react";

import { getEmailFromResend } from "@/app/api/actions";
import { iCustomMessage } from "@/types";

export function CustomMessage(props: iCustomMessage) {
  const {message} = props

  const [email, setEmail] = useState("")

  async function getCustomerMail(){
    const query = await getEmailFromResend(message)

    if(query?.email !== undefined){
      setEmail(query.email)
    }
  }

  getCustomerMail()

  return (
    <div className="text-center p-20 bg-white rounded-lg shadow-xl transform transition-all hover:scale-105 duration-300">
        <HeartHandshake className="w-24 h-24 mx-auto text-pink-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">¡Gracias por visitarnos!</h1>
        <p className="text-xl text-gray-600 mb-4">¡Su solicitud ha sido enviada con éxito! 🎉</p>
        <p className="text-sm text-gray-500">En breve nos pondremos en contacto contigo al correo suministrado {email}.</p>
        <p className="text-sm text-gray-500">Serás redirigido a la página principal en 5 segundos...</p>
      </div>
  )
}
