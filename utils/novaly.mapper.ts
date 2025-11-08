import {
  DivisionNombreCompleto,
  NovalyPayload,
  NovalyRequest,
} from "@/interfaces";

export class NovalyAppMapper {
  static toPayload(request: NovalyRequest): NovalyPayload {
    const { nombres, apellidos } = this.dividirNombreCompleto(
      request.nombreCompleto
    );

    return {
      nombres,
      apellidos,
      celular: request.numeroCelular,
      email: request.correoElectronico,
      tipo_documento: request.tipoDocumento || "",
      numero_documento: request.numeroDocumento || "",
      ciudad_origen: request.ciudadCotizacion || "",
      marca: request.marcaVehiculo || "",
      modelo: request.modeloVehiculo || "",
      id_marca: request.idMarca || 0,
      id_tienda: request.idTienda || 0,
      form_name: "NUEVOS",
      city: request.ciudadCotizacion || "",
      utm: request.utmTrafico || "",
    };
  }

  private static dividirNombreCompleto(
    nombreCompleto: string
  ): DivisionNombreCompleto {
    if (!nombreCompleto || nombreCompleto.trim() === "") {
      return { nombres: "", apellidos: "" };
    }

    const partes = nombreCompleto.trim().split(/\s+/);

    if (partes.length === 1) {
      return { nombres: partes[0], apellidos: "" };
    }

    if (partes.length === 2) {
      return { nombres: partes[0], apellidos: partes[1] };
    }

    const apellidos = partes.slice(-2).join(" ");
    const nombres = partes.slice(0, -2).join(" ");
    return { nombres, apellidos };
  }
}
