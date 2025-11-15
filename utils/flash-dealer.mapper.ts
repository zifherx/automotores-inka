import { FlashDealerPayload, FlashDealerRequest } from "@/interfaces";

export class FlashDealerMapper {
  static toPayload(request: FlashDealerRequest): FlashDealerPayload {
    return {
      document: request.numeroDocumento,
      full_name: request.nombreCompleto,
      email: request.correoElectronico,
      phone_number: request.numeroCelular,
      mark: request.marcaVehiculo,
      model: request.codigoFlashDealer,
      form_name: "NUEVOS",
      platform: request.plataformaOrigen,
      city: request.ciudadCotizacion,
    };
  }
}
