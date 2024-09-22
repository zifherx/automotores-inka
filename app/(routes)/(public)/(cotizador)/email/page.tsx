import { EmailTemplate } from "@/components/Shared/Email-Template";

export default function EmailPage() {
  const objeto = {
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
    modelo: "Mazda 3 Sport",
    imageUrl:
      "https://utfs.io/f/DvD6I6Zej8uO9UjgTURPCxMOhGYo1cj4yVk6R0tpXuflZvrN",
    precioBase: 19990,
  };
  return (
    <>
      <EmailTemplate
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
      />
    </>
  );
}
