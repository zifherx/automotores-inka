import { TEmailCotizacion } from "@/components/Shared/T-Email-Cotizacion";
import { iTEmailCotizacion } from "@/types";

const objeto: iTEmailCotizacion = {
  nombres: "Fernando Rojas",
  tipoDocumento: "dni",
  numeroDocumento: "70365832",
  email: "frojasq@outlook.com",
  celular: "924063422",
  departamento: "Trujillo",
  concesionario: "SAI CLUSTER",
  intencionCompra: "esta-semana",
  checkDatosPersonales: true,
  checkPromociones: "yes",
  marca: "Mazda",
  modelo: "CX-5",
  imageUrl:
    "https://utfs.io/f/DvD6I6Zej8uOcM2FwlCaBbdXPm5RwxHKEGF0oe2jYNMhDVsL",
  precioBase: 19990,
  tcambio: 3.8,
};

export default function EmailPage() {
  return (
    <div className="max-w-3xl mx-auto p-4">
      <TEmailCotizacion
        nombres={objeto.nombres}
        tipoDocumento={objeto.tipoDocumento}
        numeroDocumento={objeto.numeroDocumento}
        email={objeto.email}
        celular={objeto.celular}
        departamento={objeto.departamento}
        concesionario={objeto.concesionario}
        intencionCompra={objeto.intencionCompra}
        checkDatosPersonales={objeto.checkDatosPersonales}
        checkPromociones={objeto.checkPromociones}
        marca={objeto.marca}
        modelo={objeto.modelo}
        imageUrl={objeto.imageUrl}
        precioBase={objeto.precioBase}
        tcambio={objeto.tcambio}
      />
    </div>
  );
}
