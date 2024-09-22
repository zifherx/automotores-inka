import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { dbConnect } from "@/lib";

import Cover from "@/models/Cover";

export async function PATCH(
  req: Request,
  { params }: { params: { portadaId: string } }
) {
  await dbConnect();

  try {
    const { userId } = auth();
    const { portadaId } = params;
    const { isActive } = await req.json();

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const query = await Cover.findByIdAndUpdate(
      portadaId,
      { isActive: isActive },
      { new: true }
    );

    if (!query)
      return NextResponse.json(
        { message: `Portada ${portadaId} no encontrada` },
        { status: 404 }
      );

    return NextResponse.json(query);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
