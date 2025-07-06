import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import Bitacora from "@/models/Bitacora";

import { dbConnect } from "@/lib";
import { IFlashDealerObjectBD } from "@/interfaces";

const URI_LEADS_FD = process.env.ENDPOINT_FD;
const TOKEN_FD = process.env.TOKEN_FD;

export async function POST(req: NextRequest): Promise<NextResponse> {
  await dbConnect();
  const requestData = await req.json();

  const objetoFD: IFlashDealerObjectBD = {
    document: requestData.numeroDocumento,
    email: requestData.correoElectronico,
    phone_number: requestData.numeroCelular,
    mark: requestData.marcaVehiculo,
    model: requestData.codigoFlashDealer,
    year: "",
    vehicle: "",
    mileage: "",
    form_id: "",
    form_name: "NUEVOS",
    campaign_id: "",
    page_id: "",
    page_name: "",
    platform: "PAGINA WEB",
    city: requestData.ciudadCotizacion,
  };

  try {
    const response = await axios.post(`${URI_LEADS_FD}`, objetoFD, {
      headers: {
        Authorization: TOKEN_FD,
      },
    });

    // Guardado en Bitacora - Sucessful
    const bitacoreSucessful = new Bitacora({
      request: {
        body: JSON.stringify(objetoFD),
        authorization: response.config.headers.Authorization,
        accept: response.config.headers.Accept,
      },
      response: {
        body: JSON.stringify(response.data),
        code: response.status,
        statusText: response.statusText,
      },
      method: response.config.method,
      url: response.config.url,
    });
    await bitacoreSucessful.save();

    return NextResponse.json({
      success: true,
      message: `${response.data.message} en FD`,
      response: response.data,
    });
  } catch (err: any) {
    console.log(err.message);
    console.log(err);

    // Guardado en Bitacore - Error
    const bitacoraError = new Bitacora({
      request: {
        body: JSON.stringify(err.response.config.data),
        authorization: err.response.headers.Authorization
          ? err.response.headers.Authorization
          : "",
        accept: err.response.config.headers.Accept
          ? err.response.config.headers.Accept
          : "",
      },
      response: {
        body: JSON.stringify(err.response.data),
        code: err.response.status,
        statusText: err.response.statusText,
      },
      method: err.response.config.method,
      url: err.response.config.url ? err.response.config.url : "",
    });
    await bitacoraError.save();

    return NextResponse.json(
      { success: false, message: "Error interno en el servidor" },
      { status: 500 }
    );
  }
}
