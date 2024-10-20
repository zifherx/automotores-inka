import { TEmailReclamo } from "@/components/Shared/T-Email-Reclamo";
import { iTEmailReclamo } from "@/types";

const objeto: iTEmailReclamo = {
  nombres: "Fernando Hendrix",
  apellidos: "Rojas Quezada",
  fecha: "19/10/24",
  hora: "11:30 a. m.",
  numeroReclamo: "LRD-INKA-00000008-2024",
  razonSocial: "AUTOMOTORES INKA S.A.C.",
  direccionSede: "AV. ANGAMOS ESTE N°1669, SURQUILLO, LIMA",
  sedeCompra: "LIMSURQUI",
};

export default function EmailPage() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <TEmailReclamo
        nombres={objeto.nombres}
        apellidos={objeto.apellidos}
        fecha={objeto.fecha}
        hora={objeto.hora}
        numeroReclamo={objeto.numeroReclamo}
        razonSocial={objeto.razonSocial}
        direccionSede={objeto.direccionSede}
        sedeCompra={objeto.sedeCompra}
      />
    </div>
  );
}
