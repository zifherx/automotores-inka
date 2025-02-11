import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

import Cliente from "@/models/Cliente";
import Modelo from "@/models/Modelo";
import Sucursal from "@/models/Sucursal";
import Cotizacion from "@/models/Cotizacion";

import Bitacora from "@/models/Bitacora";
import { dbConnect } from "@/lib";
import { iCustomer, iLead, iModelo, iSede } from "@/types";

const URI_LEADS_FD = process.env.ENDPOINT_FD;
const TOKEN_FD = process.env.TOKEN_FD;

export async function GET(req: NextRequest) {
  await dbConnect();
  let query;

  const paramFrom = await req.nextUrl.searchParams.get("from");
  const paramTo = await req.nextUrl.searchParams.get("to");

  try {
    if (paramFrom == null || paramTo == null) {
      console.log("Sin Filtros");
      query = await Cotizacion.find({})
        .sort({ createdAt: -1 })
        .populate([
          {
            path: "cliente",
            select:
              "_id name tipoDocumento numeroDocumento celular email createdAt",
          },
          {
            path: "vehiculo",
            select:
              "_id name slug imageUrl marca precioBase isActive createdAt",
            populate: [
              {
                path: "marca",
                select: "name",
              },
            ],
          },
          {
            path: "sede",
            select: "_id name slug ciudad isActive createdAt codexHR",
          },
        ]);
      return NextResponse.json({ total: query.length, obj: query });
    } else {
      console.log("Con Filtros");
      query = await Cotizacion.find({
        createdAt: { $gte: new Date(paramFrom), $lte: new Date(paramTo) },
      })
        .sort({ createdAt: -1 })
        .populate([
          {
            path: "cliente",
            select:
              "_id name tipoDocumento numeroDocumento celular email createdAt",
          },
          {
            path: "vehiculo",
            select:
              "_id name slug imageUrl marca precioBase isActive createdAt",
            populate: [
              {
                path: "marca",
                select: "name",
              },
            ],
          },
          {
            path: "sede",
            select: "_id name slug ciudad isActive createdAt codexHR",
          },
        ]);
      return NextResponse.json({ total: query.length, obj: query });
    }
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const dataForm = await req.json();
  let newCustomer = null;

  // console.log("###PAYLOAD", dataForm);

  try {
    const customerFound: iCustomer | null = await Cliente.findOne({
      numeroDocumento: dataForm.numeroDocumento,
    });
    if (!customerFound) {
      const qCustomer = new Cliente({
        name: dataForm.nombres,
        tipoDocumento: dataForm.tipoDocumento,
        numeroDocumento: dataForm.numeroDocumento,
        celular: dataForm.celular,
        email: dataForm.email,
        usoDatosPersonales: dataForm.checkDatosPersonales,
        aceptaPromociones: dataForm.checkPromociones,
      }) as iCustomer;

      newCustomer = await qCustomer.save();
    }

    const vehicleFound: iModelo | null = await Modelo.findOne({
      slug: dataForm.slugModelo,
    }).populate({
      path: "marca",
      select: "name",
    });

    const sedeFound: iSede | null = await Sucursal.findOne({
      slug: dataForm.slugConcesionario,
    });

    const qCotizacion = new Cotizacion({
      cliente: customerFound ? customerFound._id : newCustomer?._id,
      vehiculo: vehicleFound!._id,
      ciudad: dataForm.departamento,
      sede: sedeFound!._id,
      intencionCompra: dataForm.intencionCompra,
    }) as iLead;

    const query = await qCotizacion.save();

    const objFD = {
      document: customerFound
        ? customerFound.numeroDocumento
        : newCustomer?.numeroDocumento,
      email: customerFound ? customerFound.email : newCustomer!.email,
      pone_number: `+51${
        customerFound ? customerFound.celular : newCustomer!.celular
      }`,
      mark: vehicleFound!.marca.name.toUpperCase(),
      model: vehicleFound!.codigo_flashdealer,
      year: "",
      vehicle: "",
      mileage: "",
      form_id: "",
      form_name: "NUEVOS",
      campaign_id: "",
      page_id: "",
      page_name: "",
      platform: "PAGINA WEB",
      city: sedeFound!.ciudad.toUpperCase(),
    };
    // console.log("####objFD", objFD);
    if (query) {
      const responseFlashDealer = await axios.post(`${URI_LEADS_FD}`, objFD, {
        headers: {
          Authorization: TOKEN_FD,
        },
      });

      const objBitacora = new Bitacora({
        request: {
          body: JSON.stringify(objFD),
          authorization: responseFlashDealer.config.headers.Authorization,
          accept: responseFlashDealer.config.headers.Accept,
        },
        response: {
          body: JSON.stringify(responseFlashDealer.data),
          code: responseFlashDealer.status,
          statusText: responseFlashDealer.statusText,
        },
        method: responseFlashDealer.config.method,
        url: responseFlashDealer.config.url,
      });
      await objBitacora.save();

      return NextResponse.json({
        success: true,
        message: `Cotización ${new Date().getTime()} registrada ✅`,
        obj: query,
      });
    }
  } catch (err: any) {
    console.log(err);
    const objBitacoraError = new Bitacora({
      request: {
        body: JSON.stringify(err.response.config.data),
        authorization: err.response.headers.Authorization,
        accept: err.config.headers.Accept,
      },
      response: {
        body: JSON.stringify(err.response.data),
        code: err.response.status,
        statusText: err.response.statusText,
      },
      method: err.response.config.method,
      url: err.response.config.url,
    });
    await objBitacoraError.save();
    return new NextResponse("Internal Error", { status: 500 });
  }
}
