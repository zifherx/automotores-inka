import { NextResponse } from "next/server";

import axios from "axios";

import { dbConnect } from "@/lib";

import Cliente from "@/models/Cliente";
import Modelo from "@/models/Modelo";
import Sucursal from "@/models/Sucursal";
import Cotizacion from "@/models/Cotizacion";

import { iCustomer, iLead } from "@/types";

export async function POST(req: Request) {
  await dbConnect();
  const dataForm = await req.json();
  let envioCorreo = null;
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

    // console.log("Cliente:", customerFound ? customerFound : newCustomer);
    // console.log("Modelo:", vehicleFound);
    // console.log("Sede:", sedeFound);

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
      obj: dataForm,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
