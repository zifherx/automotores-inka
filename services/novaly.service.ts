import { NovalyPayload } from "@/interfaces";
import axios, { AxiosResponse } from "axios";

export class NovalyService {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = process.env.ENDPOINT_NOVALY as string;

    if (!this.apiUrl) {
      throw new Error("Falta el API Endpoint de Novaly");
    }
  }

  async enviarCotizacionaNovaly(
    payload: NovalyPayload
  ): Promise<AxiosResponse> {
    console.log(
      `NovalyService | enviarCotizacionaNovaly | payload: ${JSON.stringify(
        payload
      )}`
    );

    try {
      console.time(`NovalyService | enviarCotizacionaNovaly`);
      const response = await axios.post(this.apiUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.timeEnd(`NovalyService | enviarCotizacionaNovaly`);
      return response;
    } catch (err: any) {
      console.log("Error: ", err);
      console.log("NovalyService | CATCH | err: ", err.message);
      if (axios.isAxiosError(err)) {
        throw err;
      }
      throw new Error(`Error al enviar datos a Novaly: ${err.message}`);
    }
  }
}
