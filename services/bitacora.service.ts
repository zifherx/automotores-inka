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
      method: response.config?.method?.toUpperCase() || "POST",
      url: response.config?.url || "",
    };

    console.log(`BitacoraService | logSuccess | STARTED`);
    await this.saveBitacora(bitacoraData);
    console.log(`BitacoraService | logSuccess | ENDED}`);
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
        statusText: error.response?.statusText || error.code || "UNKNOWN_ERROR",
      },
      method: error.config?.method?.toUpperCase() || "POST",
      url: error.config?.url || "",
    };

    console.log(`BitacoraService | logError | STARTED`);
    await this.saveBitacora(bitacoraData);
    console.log(`BitacoraService | logError | ENDED`);
  }

  async logValidationError(
    requestData: any,
    errorResponse: any
  ): Promise<void> {
    const bitacoraData: BitacoraData = {
      request: {
        body: JSON.stringify(requestData),
        authorization: "",
        accept: "application/json",
      },
      response: {
        body: JSON.stringify(errorResponse),
        code: 400,
        statusText: "Bad Request - Validation Error",
      },
      method: "POST",
      url: process.env.ENDPOINT_NOVALY || "N/A",
    };

    console.log(`BitacoraService | logValidationError | STARTED`);
    await this.saveBitacora(bitacoraData);
    console.log(`BitacoraService | logValidationError | ENDED`);
  }

  async logGenericError(
    requestData: any,
    errorResponse: any,
    errorMessage: string
  ) {
    const bitacoraData: BitacoraData = {
      request: {
        body: JSON.stringify(requestData),
        authorization: "",
        accept: "application/json",
      },
      response: {
        body: JSON.stringify({
          ...errorResponse,
          originalError: errorMessage,
        }),
        code: 500,
        statusText: "Internal Server Error",
      },
      method: "POST",
      url: process.env.ENDPOINT_NOVALY || "N/A",
    };

    console.log(`BitacoraService | logGenericError | STARTED`);
    await this.saveBitacora(bitacoraData);
    console.log(`BitacoraService | logGenericError | ENDED`);
  }

  private async saveBitacora(data: BitacoraData): Promise<void> {
    console.log(
      `BitacoraService | saveBitacora | code: ${JSON.stringify(
        data.response.code
      )}`
    );
    try {
      const bitacora = new Bitacora(data);
      const resultBitacora = await bitacora.save();
      console.log(
        `BitacoraService | saveBitacora | resultBitacora: ${JSON.stringify(
          resultBitacora
        )}`
      );
    } catch (err) {
      console.error(`Error guardando bitacora`, err);
    }
  }
}
