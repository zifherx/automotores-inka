import { NextRequest, NextResponse } from "next/server";

import Cliente from "@/models/Cliente";
import Modelo from "@/models/Modelo";
import Sucursal from "@/models/Sucursal";
import Cotizacion from "@/models/Cotizacion";

import { dbConnect } from "@/lib";
import { iCustomer, iLead, iModelo, iSede } from "@/types";

export async function GET(req: NextRequest) {
  await dbConnect();
  let query;

  const paramFrom = await req.nextUrl.searchParams.get("from");
  const paramTo = await req.nextUrl.searchParams.get("to");

  console.log("Filtro:", { paramFrom, paramTo });

  try {
    if (paramFrom == null || paramTo == null) {
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

      // console.log("Q: ", query);

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

      // console.log("Q: ", query);

      return NextResponse.json({ total: query.length, obj: query });
    }
  } catch (err: any) {
    console.log(err);
    console.log(err.message);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const dataForm = await req.json();
  let newCustomer = null;

  try {
    const customerFound: iCustomer | null = await Cliente.findOne({
      numeroDocumento: dataForm.numeroDocumento,
    });

    // console.log("customerFound", customerFound);

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
    } else {
      const updateCliente = await Cliente.findByIdAndUpdate(
        customerFound._id,
        {
          celular: dataForm.celular,
          email: dataForm.email,
          aceptaPromociones: dataForm.checkPromociones,
        },
        { new: true }
      );
      console.log("updateCliente", updateCliente);
    }

    const vehicleFound = (await Modelo.findOne({
      slug: dataForm.slugModelo,
    }).populate({
      path: "marca",
      select: "name",
    })) as iModelo;

    const sedeFound = (await Sucursal.findOne({
      slug: dataForm.slugConcesionario,
    })) as iSede;

    const qCotizacion = new Cotizacion({
      cliente: customerFound ? customerFound._id : newCustomer?._id,
      vehiculo: vehicleFound!._id,
      ciudad: dataForm.departamento,
      sede: sedeFound._id,
      intencionCompra: dataForm.intencionCompra,
    }) as iLead;

    const query = await qCotizacion.save();

    if (!query) {
      throw new NextResponse("No se pudo guardar la cotización en BD", {
        status: 500,
      });
    }

    console.log("Q: ", query);

    return NextResponse.json({
      success: true,
      message: `Cotización ${new Date().getTime()} registrada ✅`,
      obj: query,
    });
  } catch (err: any) {
    console.error(err);
    console.error(err.message);
    if (err.name === "AbortError") {
      return NextResponse.json({ error: "Request Timeout" }, { status: 504 });
    }
    return NextResponse.json(
      { success: false, message: "Error interno en el servidor" },
      { status: 500 }
    );
  }
}
