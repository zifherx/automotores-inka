import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import TipoCambio from "@/models/Tipo-Cambio";
import { dbConnect } from "@/lib";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const dataForm = await req.json();

    if (!userId)
      return NextResponse.json(
        { success: false, message: "No Autorizado" },
        { status: 401 }
      );

    const respuesta = await existeFecha(dataForm.fechaTC);

    if (respuesta) {
      return NextResponse.json(
        {
          success: false,
          message: `Ya existe TC para este día: ${dataForm.fechaTC}`,
        },
        { status: 404 }
      );
    }

    const newObj = new TipoCambio({
      ...dataForm,
      createdBy: userId,
      fechaCreado: new Date(),
    });

    const query = await newObj.save();

    if (query)
      return NextResponse.json({
        success: true,
        message: `Tipo de cambio creado ✅`,
      });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const query = await TipoCambio.find({}).sort({ fecha: 1 });
    return NextResponse.json({ total: query.length, obj: query });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

const existeFecha = async (fechaPayload: string): Promise<boolean> => {
  await dbConnect();

  const getFechaDB = await TipoCambio.findOne({ fechaTC: fechaPayload });

  return getFechaDB !== null;
};
