import { NextRequest, NextResponse } from "next/server";

import Cita from "@/models/Citas";
import Cliente from "@/models/Cliente";
import Modelo from "@/models/Modelo";
import Sucursal from "@/models/Sucursal";

import { dbConnect } from "@/lib";
import { iAppointment, iCustomer } from "@/types";

export async function GET(req: NextRequest) {
  await dbConnect();
  let query;

  const paramFrom = await req.nextUrl.searchParams.get("from");
  const paramTo = await req.nextUrl.searchParams.get("to");

  try {
    if (paramFrom == null || paramTo == null) {
      console.log("Sin filtros");
      query = await Cita.find({})
        .sort({ createdAt: -1 })
        .populate([
          {
            path: "cliente",
            select:
              "name tipoDocumento numeroDocumento celular email usoDatosPersonales",
          },
          {
            path: "modelo",
            select: "name slug imageUrl precioBase isActive marca",
            populate: {
              path: "marca",
              select: "name slug imageUrl",
            },
          },
          {
            path: "concesionario",
            select: "name slug ciudad address",
          },
        ]);
    } else {
      console.log("Con filtros");
      query = await Cita.find({
        createdAt: { $gte: new Date(paramFrom), $lte: new Date(paramTo) },
      })
        .sort({ createdAt: -1 })
        .populate([
          {
            path: "cliente",
            select:
              "name tipoDocumento numeroDocumento celular email usoDatosPersonales",
          },
          {
            path: "modelo",
            select: "name slug imageUrl precioBase isActive marca",
            populate: {
              path: "marca",
              select: "name slug imageUrl",
            },
          },
          {
            path: "concesionario",
            select: "name slug ciudad address",
          },
        ]);
    }
    return NextResponse.json({ total: query.length, obj: query });
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const dataForm = await req.json();
  let newCustomer = null;

  console.log("Server: ", dataForm);

  try {
    const clienteFound = await Cliente.findOne({
      numeroDocumento: dataForm.numeroDocumento,
    });
    if (!clienteFound) {
      const qCustomer = new Cliente({
        name: dataForm.nombres,
        tipoDocumento: dataForm.tipoDocumento,
        numeroDocumento: dataForm.numeroDocumento,
        celular: dataForm.celular,
        email: dataForm.correo,
        usoDatosPersonales: dataForm.checkDatosPersonales,
        aceptaPromociones: dataForm.checkPromociones,
      }) as iCustomer;

      newCustomer = await qCustomer.save();
    }

    const vehicleFound = await Modelo.findOne({ slug: dataForm.modelo });

    const sedeFound = await Sucursal.findOne({
      slug: dataForm.concesionario,
    });

    const qCita = new Cita({
      cliente: clienteFound ? clienteFound._id : newCustomer?._id,
      placa: dataForm.placa,
      kilometraje: dataForm.kilometraje,
      ciudadSede: dataForm.sede,
      marcaFlat: dataForm.marca,
      modeloFlat: dataForm.modelo,
      modelo: vehicleFound._id,
      concesionario: sedeFound._id,
      tipoServicio: dataForm.tipoServicio,
      comentario: dataForm.comentario,
      whatsappMessage: dataForm.whatsappMessage,
      whatsappContact: dataForm.whatsappContact,
    }) as iAppointment;

    const query = await qCita.save();

    return NextResponse.json({
      message: `Cita de Servicio ${new Date().getTime()} registrada con éxito.`,
      obj: query,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
