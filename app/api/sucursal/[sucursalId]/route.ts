import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "@/lib";
import Sucursal from "@/models/Sucursal";

export async function PATCH(
  req: Request,
  { params }: { params: { sucursalId: string } }
) {
  await dbConnect();

  try {
    const { userId } = auth();
    const { sucursalId } = params;
    const { isActive } = await req.json();

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const query = await Sucursal.findByIdAndUpdate(
      sucursalId,
      { isActive: isActive },
      { new: true }
    );

    if (!query)
      return NextResponse.json(
        { message: `Sede ${sucursalId} no encontrada` },
        { status: 404 }
      );

    return NextResponse.json(query);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { sucursalId: string } }
) {
  await dbConnect();

  try {
    const { userId } = auth();
    const { sucursalId } = params;

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const query = await Sucursal.findByIdAndDelete(sucursalId);

    if (!query)
      return NextResponse.json(
        { message: `Sede ${sucursalId} no encontrada` },
        { status: 404 }
      );

    return NextResponse.json(query);
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
