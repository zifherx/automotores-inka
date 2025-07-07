import { FlashDealerPayload, FlashDealerRequest } from "@/interfaces";

export class FlashDealerMapper {
  static toPayload(request: FlashDealerRequest): FlashDealerPayload {
    return {
      document: request.numeroDocumento,
      email: request.correoElectronico,
      phone_number: request.numeroCelular,
      mark: request.marcaVehiculo,
      model: request.codigoFlashDealer,
      year: "",
      vehicle: "",
      mileage: "",
      form_id: "",
      form_name: "NUEVOS",
      campaign_id: "",
      page_id: "",
      page_name: "",
      platform: "PAGINA WEB",
      city: request.ciudadCotizacion,
    };
  }
}
