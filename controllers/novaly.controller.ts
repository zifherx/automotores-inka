import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";

import { BitacoraService } from "@/services/bitacora.service";
import { NovalyService } from "@/services/novaly.service";

import { NovalyAppMapper } from "@/utils/novaly.mapper";
import { dbConnect } from "@/lib";
import { NovalyPayload } from "@/interfaces";

export class NovalyController {
  private novalyService: NovalyService;
  private bitacoraService: BitacoraService;

  constructor() {
    this.novalyService = new NovalyService();
    this.bitacoraService = new BitacoraService();
  }

  async handlePost(req: NextRequest): Promise<NextResponse> {
    let requestData: any;
    let payloadData: NovalyPayload;

    try {
      await dbConnect();

      requestData = await req.json();

      const camposFaltantes = this.validarCamposRequeridos(requestData);
      if (camposFaltantes.length > 0) {
        const errorResponse = {
          success: false,
          error: "Campos requeridos faltantes",
          camposFaltantes,
        };

        this.bitacoraService
          .logValidationError(requestData, errorResponse)
          .catch(console.error);

        return NextResponse.json(errorResponse, { status: 400 });
      }

      payloadData = NovalyAppMapper.toPayload(requestData);

      console.time(`NovalyController | handlePost`);
      const response = await this.novalyService.enviarCotizacionaNovaly(
        payloadData
      );
      console.timeEnd(`NovalyController | handlePost`);

      this.bitacoraService
        .logSuccess(response, payloadData)
        .catch(console.error);

      return NextResponse.json({
        success: response.data.success,
        message: response.data.message,
        response: response.data,
      });
    } catch (err) {
      return this.handleError(err, requestData, payloadData!);
    }
  }

  private async handleError(
    err: unknown,
    requestData?: NextRequest,
    payloadData?: NovalyPayload
  ): Promise<NextResponse> {
    try {
      if (err instanceof AxiosError) {
        const errorResponse = {
          success: false,
          message:
            err.response?.data?.message ||
            "NovalyController | handleError => Error al procesar lead",
          error: err.response?.data?.error || err.message,
        };

        if (payloadData) {
          this.bitacoraService.logError(err, payloadData).catch(console.error);
        }

        return NextResponse.json(errorResponse, {
          status: err.response?.status || 500,
        });
      }

      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      const errorResponse = {
        success: false,
        error: "Error al procesar lead",
        message: errorMessage,
      };

      if (requestData) {
        this.bitacoraService
          .logGenericError(requestData, errorResponse, errorMessage)
          .catch(console.error);
      }

      return NextResponse.json(errorResponse, { status: 500 });
    } catch (handleErrorException) {
      console.error("Error crítico en handleError: ", handleErrorException);
      return NextResponse.json(
        {
          success: false,
          error: "Error al procesar lead",
          message: `Error interno del servidor`,
        },
        { status: 500 }
      );
    }
  }

  private validarCamposRequeridos(data: any): string[] {
    const camposRequeridos = [
      "nombreCompleto",
      "numeroCelular",
      "correoElectronico",
    ];
    const faltantes: string[] = [];

    for (const campo of camposRequeridos) {
      if (
        !data[campo] ||
        (typeof data[campo] === "string" && data[campo].trim() === "")
      ) {
        faltantes.push(campo);
      }
    }

    return faltantes;
  }
}
