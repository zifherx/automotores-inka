import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { auth } from "@clerk/nextjs/server";
import Carroceria from "@/models/Carroceria";

export async function PATCH(
  req: Request,
  { params }: { params: { chasisId: string } }
) {
  await dbConnect();

  try {
    const { userId } = auth();
    const { chasisId } = params;
    const { isActive } = await req.json();

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const query = await Carroceria.findByIdAndUpdate(
      chasisId,
      { isActive },
      { new: true }
    );

    if (!query)
      return NextResponse.json(
        { message: "Carrocería no encontrada" },
        { status: 404 }
      );

    return NextResponse.json(query);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
