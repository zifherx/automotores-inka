import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { dbConnect } from "@/lib";
import TipoCambio from "@/models/Tipo-Cambio";

export async function PATCH() {}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { tcambioId: string } }
) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const { tcambioId } = params;

    if (!userId)
      return NextResponse.json(
        { success: false, message: "No Autorizado" },
        { status: 401 }
      );

    const query = await TipoCambio.findByIdAndDelete(tcambioId);

    if (!query)
      return NextResponse.json(
        { message: `Tipo de cambio ${tcambioId} no encontrado` },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      message: `Tipo de cambio eliminado ❌`,
      res: query,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
