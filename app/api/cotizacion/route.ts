import { NextRequest, NextResponse } from "next/server";

import Cliente from "@/models/Cliente";
import Modelo from "@/models/Modelo";
import Sucursal from "@/models/Sucursal";
import Cotizacion from "@/models/Cotizacion";

import { dbConnect } from "@/lib";
import { iCustomer, iLead } from "@/types";

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

  try {
    const customerFound = await Cliente.findOne({
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

    const vehicleFound = await Modelo.findOne({ slug: dataForm.slugModelo });

    const sedeFound = await Sucursal.findOne({
      slug: dataForm.slugConcesionario,
    });

    const qCotizacion = new Cotizacion({
      cliente: customerFound ? customerFound._id : newCustomer?._id,
      vehiculo: vehicleFound._id,
      ciudad: dataForm.departamento,
      sede: sedeFound._id,
      intencionCompra: dataForm.intencionCompra,
    }) as iLead;

    const query = await qCotizacion.save();

    return NextResponse.json({
      message: `Cotización ${new Date().getTime()} registrada con éxito.`,
      obj: query,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
