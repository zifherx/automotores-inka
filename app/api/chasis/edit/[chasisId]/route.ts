import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib";
import Carroceria from "@/models/Carroceria";
import { iChasis } from "@/types";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { chasisId: string } }
) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const { chasisId } = params;
    const dataForm: iChasis = await req.json();

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const query = await Carroceria.findByIdAndUpdate(chasisId, dataForm);

    if (!query)
      return NextResponse.json(
        {
          success: false,
          message: `Carrocería ${dataForm.name} no encontrada`,
        },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      message: `Carrocería actualizada con éxito ✅`,
      new: query,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
