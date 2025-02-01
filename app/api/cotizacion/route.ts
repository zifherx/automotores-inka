import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

import Cliente from "@/models/Cliente";
import Modelo from "@/models/Modelo";
import Sucursal from "@/models/Sucursal";
import Cotizacion from "@/models/Cotizacion";

import { dbConnect } from "@/lib";
import { iCustomer, iLead, iModelo, iSede } from "@/types";

const URI_LEADS_FD = process.env.ENDPOINT_FD;
const TOKEN_FD = process.env.TOKEN_FD;

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const query = await Cotizacion.find({})
      .sort({ createdAt: -1 })
      .populate([
        {
          path: "cliente",
          select:
            "_id name tipoDocumento numeroDocumento celular email createdAt",
        },
        {
          path: "vehiculo",
          select: "_id name slug imageUrl precioBase isActive createdAt",
        },
        {
          path: "sede",
          select: "_id name slug ciudad isActive createdAt codexHR",
        },
      ]);

    return NextResponse.json({ total: query.length, obj: query });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const dataForm = await req.json();
  let newCustomer = null;

  console.log("###PAYLOAD", dataForm);

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

    // console.log("customerFound", customerFound);
    // console.log("vehicleFound", vehicleFound);
    // console.log("sedeFound", sedeFound);
    console.log("URI_LEADS_FD", URI_LEADS_FD);
    console.log("TOKEN_FD", TOKEN_FD);
    console.log("query", query);

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
      platform: "WEB",
      city: sedeFound!.ciudad.toUpperCase(),
    };
    console.log("####objFD", objFD);
    if (query) {
      const responseFlashDealer = await axios.post(`${URI_LEADS_FD}`, objFD, {
        headers: {
          Authorization: TOKEN_FD,
        },
      });
      console.log("####RESPONSE-FD", responseFlashDealer.data);
      return NextResponse.json({
        success: true,
        message: `Cotización ${new Date().getTime()} registrada con éxito.`,
        obj: query,
      });
    }
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
