import { FlashDealerRequest } from "@/interfaces";

export class RequestValidator {
  static validateFlashDealerRequest(data: any): FlashDealerRequest {
    const errors: string[] = [];

    if (!data.numeroDocumento) errors.push("numeroDocumento es obligatorio");
    if (!data.correoElectronico)
      errors.push("correoElectronico es obligatorio");
    if (!data.numeroCelular) errors.push("numeroCelular es obligatorio");
    if (!data.marcaVehiculo) errors.push("marcaVehiculo es obligatorio");
    if (!data.codigoFlashDealer)
      errors.push("codigoFlashDealer es obligatorio");
    if (!data.ciudadCotizacion) errors.push("ciudadCotizacion es obligatorio");

    if (data.correoElectronico && !this.isValidEmail(data.correoElectronico)) {
      errors.push("correoElectronico debe ser un email válido");
    }

    if (errors.length > 0) {
      throw new Error(`Validaciónn de errores: ${errors.join(", ")}`);
    }
    return data as FlashDealerRequest;
  }

  private static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
