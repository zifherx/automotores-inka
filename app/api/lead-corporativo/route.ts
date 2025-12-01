import { NextRequest, NextResponse } from "next/server";

import { Marca } from "@/models";
import Cliente from "@/models/Cliente";
import LeadCorporativo, { iLeadCorporativo } from "@/models/LeadCorporativo";

import { dbConnect } from "@/lib";
import { iCustomer } from "@/types";

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();

  let nuevoCliente = null;

  try {
    const clienteExiste: iCustomer | null = await Cliente.findOne({
      numeroDocumento: body.numeroDocumento,
    });

    if (!clienteExiste) {
      const newCliente = new Cliente({
        name: body.nombreCompleto,
        tipoDocumento: body.tipoDocumento,
        numeroDocumento: body.numeroDocumento,
        email: body.correoElectronico,
        celular: body.celular,
        usoDatosPersonales: true,
        uaceptaPropmociones: true,
      }) as iCustomer;

      nuevoCliente = await newCliente.save();
    } else {
      const actualizarCliente = await Cliente.findByIdAndUpdate(
        clienteExiste._id,
        {
          name: body.nombreCompleto,
          tipoDocumento: body.tipoDocumento,
          numeroDocumento: body.numeroDocumento,
          email: body.correoElectronico,
          celular: body.celular,
          usoDatosPersonales: true,
          uaceptaPropmociones: true,
        },
        {
          new: true,
        }
      );
    }

    const marcaEncontrada = await Marca.findById(body.marcaId);

    if (!marcaEncontrada) {
      throw new NextResponse(`No se ha encontrado la marca: ${body.marcaText}`);
    }

    const nuevoLeadCorporativo = new LeadCorporativo({
      cliente: clienteExiste ? clienteExiste._id : nuevoCliente?._id,
      marca: marcaEncontrada ? marcaEncontrada._id : null,
      marcaText: body.marcaText,
      intencionCompra: body.intencionCompra,
    }) satisfies iLeadCorporativo;

    console.time(`POST | Nuevo Lead Corporativo`);
    const query = await nuevoLeadCorporativo.save();
    console.timeEnd(`POST | Nuevo Lead Corporativo`);

    if (!query) {
      throw new NextResponse(`No se pudo guardar el lead corporativo en BD`, {
        status: 500,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Lead Corporativo ${new Date().getTime()} registrado ✅`,
      response: query,
    });
  } catch (err: any) {
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
