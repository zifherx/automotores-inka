import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "@/lib";
import Marca from "@/models/Marca";

export async function PATCH(
  req: Request,
  { params }: { params: { marcaId: string } }
) {
  await dbConnect();
  try {
    const { userId } = await auth();
    const { marcaId } = params;
    const { isActive } = await req.json();

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const query = await Marca.findByIdAndUpdate(
      marcaId,
      { isActive },
      { new: true }
    );

    if (!query)
      return NextResponse.json(
        { message: `Marca ${marcaId} no encontrada` },
        { status: 404 }
      );

    return NextResponse.json(query);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
