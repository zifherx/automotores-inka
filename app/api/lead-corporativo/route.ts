import { NextRequest, NextResponse } from "next/server";

import { Marca } from "@/models";
import LeadCorporativo, { iLeadCorporativo } from "@/models/LeadCorporativo";

import { dbConnect } from "@/lib";

export async function POST(req: NextRequest) {
  await dbConnect();

  const body = await req.json();

  try {
    const marcaEncontrada = await Marca.findById(body.marcaId);

    if (!marcaEncontrada) {
      throw new NextResponse(`No se ha encontrado la marca: ${body.marcaText}`);
    }

    const nuevoLeadCorporativo = new LeadCorporativo({
      nombreCompleto: body.nombreCompleto,
      dni: body.dni,
      correoElectronico: body.correoElectronico,
      celular: body.celular,
      razonSocial: body.razonSocial,
      ruc: body.ruc,
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
