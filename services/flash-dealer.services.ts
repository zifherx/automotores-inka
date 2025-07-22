import axios, { AxiosResponse } from "axios";
import { FlashDealerPayload } from "@/interfaces";

export class FlashDealerService {
  private readonly apiUrl: string;
  private readonly apiToken: string;

  constructor() {
    this.apiUrl = process.env.ENDPOINT_FD as string;
    this.apiToken = process.env.TOKEN_FD as string;

    if (!this.apiUrl || !this.apiToken) {
      throw new Error("Missing Flash Dealer API configuration");
    }
  }

  async sendLead(payload: FlashDealerPayload): Promise<AxiosResponse> {
    try {
      const response = await axios.post(this.apiUrl, payload, {
        headers: {
          Authorization: this.apiToken,
          "Content-Type": "application/json",
        },
        timeout: 30000, // 30 segundos
      });

      console.log(`FlashDealerService | sendLead | ${response}`);

      return response;
    } catch (err: any) {
      console.error(err.message);
      if (axios.isAxiosError(err)) {
        throw err;
      }
      throw new Error(`Unexpected error: ${err}`);
    }
  }
}
