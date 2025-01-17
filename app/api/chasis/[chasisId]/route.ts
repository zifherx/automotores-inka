import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { dbConnect } from "@/lib/dbConnect";
import Carroceria from "@/models/Carroceria";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { chasisId: string } }
) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const { chasisId } = params;

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const query = await Carroceria.findByIdAndDelete(chasisId);

    if (!query)
      return NextResponse.json(
        { message: "Carrocería no encontrada" },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      message: `Carrocería eliminada ❌`,
      res: query,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
