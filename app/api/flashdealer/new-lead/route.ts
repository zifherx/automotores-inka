import { NextRequest, NextResponse } from "next/server";

import { FlashDealerController } from "@/controllers/flash-dealer.controller";
import { withApiLoggerBasic } from "@/middleware/api-logger.middlewaer";

// export async function POST(req: NextRequest): Promise<NextResponse> {
//   await dbConnect();
//   const requestData = await req.json();

//   const objetoFD: IFlashDealerObjectBD = {
//     document: requestData.numeroDocumento,
//     email: requestData.correoElectronico,
//     phone_number: requestData.numeroCelular,
//     mark: requestData.marcaVehiculo,
//     model: requestData.codigoFlashDealer,
//     year: "",
//     vehicle: "",
//     mileage: "",
//     form_id: "",
//     form_name: "NUEVOS",
//     campaign_id: "",
//     page_id: "",
//     page_name: "",
//     platform: "PAGINA WEB",
//     city: requestData.ciudadCotizacion,
//   };

//   try {
//     const response = await axios.post(`${URI_LEADS_FD}/a`, objetoFD, {
//       headers: {
//         Authorization: TOKEN_FD,
//       },
//     });

//     // Guardado en Bitacora - Sucessful
//     const bitacoreSucessful = new Bitacora({
//       request: {
//         body: JSON.stringify(objetoFD),
//         authorization: response.config.headers.Authorization,
//         accept: response.config.headers.Accept,
//       },
//       response: {
//         body: JSON.stringify(response.data),
//         code: response.status,
//         statusText: response.statusText,
//       },
//       method: response.config.method,
//       url: response.config.url,
//     });
//     await bitacoreSucessful.save();

//     return NextResponse.json({
//       success: true,
//       message: `${response.data.message} en FD`,
//       response: response.data,
//     });
//   } catch (err: any) {
//     // console.log(err.message);
//     // console.log("ERR: ", err);

//     // Guardado en Bitacore - Error
//     const bitacoraError = new Bitacora({
//       request: {
//         body: JSON.stringify(objetoFD),
//         authorization: err.response.config.headers.Authorization,
//         accept: err.response.config.headers.Accept,
//       },
//       response: {
//         body: JSON.stringify(err.response.data),
//         code: err.response.status,
//         statusText: err.code,
//       },
//       method: err.response.config ? err.response.config.method : "",
//       url: err.response.config ? err.response.config.url : "",
//     });

//     console.log("bitacoraError", bitacoraError);
//     await bitacoraError.save();

//     return NextResponse.json(
//       {
//         success: false,
//         message: `Error interno en el servidor: ${err.message}`,
//       },
//       { status: 500 }
//     );
//   }
// }

const controller = new FlashDealerController();

export const POST = withApiLoggerBasic(controller.handlePost.bind(controller));
// export async function POST(req: NextRequest): Promise<NextResponse> {
//   return controller.handlePost(req);
// }
