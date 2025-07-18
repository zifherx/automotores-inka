import { NextRequest, NextResponse } from "next/server";
import { AxiosError } from "axios";

import { BitacoraService } from "@/services/bitacora.services";
import { FlashDealerService } from "@/services/flash-dealer.services";

import { FlashDealerMapper } from "@/utils/flash-dealer.mapper";
import { RequestValidator } from "@/utils/request-validatos";

import { dbConnect } from "@/lib";

export class FlashDealerController {
  private flashDealerService: FlashDealerService;
  private bitacoraService: BitacoraService;

  constructor() {
    this.flashDealerService = new FlashDealerService();
    this.bitacoraService = new BitacoraService();
  }

  async handlePost(req: NextRequest): Promise<NextResponse> {
    try {
      await dbConnect();

      const requestData = await req.json();
      const validatedData =
        RequestValidator.validateFlashDealerRequest(requestData);
      const payload = FlashDealerMapper.toPayload(validatedData);

      const response = await this.flashDealerService.sendLead(payload);

      // Respuesta asíncrona
      this.bitacoraService.logSuccess(response, payload).catch(console.error);

      return NextResponse.json({
        success: true,
        message: `${response.data?.message.trim() || "Exito"} en FD`,
        response: response.data,
      });
    } catch (err) {
      return this.handleError(err, req);
    }
  }

  private async handleError(
    err: unknown,
    req: NextRequest
  ): Promise<NextResponse> {
    console.error("Flash Dealer API Error: ", err);

    try {
      const requestData = await req.json();
      const payload = FlashDealerMapper.toPayload(requestData);

      if (err instanceof AxiosError) {
        this.bitacoraService.logError(err, payload).catch(console.error);

        return NextResponse.json(
          {
            success: false,
            message: `Error en comunicación con FlashDealer: ${err.message}`,
            error: err.response?.data || err.message,
          },
          {
            status: err.response?.status || 500,
          }
        );
      }

      return NextResponse.json(
        {
          success: false,
          message: `Error interno del servidor FD: ${
            err instanceof Error ? err.message : "Unknown error"
          }`,
        },
        {
          status: 500,
        }
      );
    } catch (parseError) {
      // console.log("parseError", parseError);
      return NextResponse.json(
        {
          success: false,
          message: `Error al procesar la solicitud`,
        },
        { status: 400 }
      );
    }
  }
}
