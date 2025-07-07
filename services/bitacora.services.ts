import { AxiosError, AxiosResponse } from "axios";

import Bitacora from "@/models/Bitacora";

import { BitacoraData } from "@/interfaces";

export class BitacoraService {
  async logSuccess(
    response: AxiosResponse,
    requestPayload: any
  ): Promise<void> {
    const bitacoraData: BitacoraData = {
      request: {
        body: JSON.stringify(requestPayload),
        authorization: response.config?.headers?.Authorization as string,
        accept: response.config?.headers?.Accept as string,
      },
      response: {
        body: JSON.stringify(response.data),
        code: response.status,
        statusText: response.statusText,
      },
      method: response.config?.method?.toUpperCase() || "",
      url: response.config?.url || "",
    };

    await this.saveBitacora(bitacoraData);
  }

  async logError(error: AxiosError, requestPayload: any): Promise<void> {
    const bitacoraData: BitacoraData = {
      request: {
        body: JSON.stringify(requestPayload),
        authorization: error.config?.headers.Authorization as string,
        accept: error.config?.headers.Accept as string,
      },
      response: {
        body: error.response?.data
          ? JSON.stringify(error.response.data)
          : JSON.stringify({ error: error.message }),
        code: error.response?.status || 500,
        statusText: error.code || "UNKNOWN_ERROR",
      },
      method: error.config?.method?.toUpperCase() || "",
      url: error.config?.url || "",
    };

    await this.saveBitacora(bitacoraData);
  }

  private async saveBitacora(data: BitacoraData): Promise<void> {
    try {
      const bitacora = new Bitacora(data);
      await bitacora.save();
    } catch (err) {
      console.error(`Error guardando bitacora`, err);
    }
  }
}
