import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Sucursal from "@/models/Sucursal";
import { dbConnect } from "@/lib";

export async function PATCH(
  req: Request,
  { params }: { params: { sucursalId: string } }
) {
  await dbConnect();

  try {
    const { userId } = auth();
    const { sucursalId } = params;
    const dataForm = await req.json();

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const query = await Sucursal.findByIdAndUpdate(
      sucursalId,
      {
        name: dataForm.name,
        slug: dataForm.slug,
        codexHR: dataForm.codexHR,
        ciudad: dataForm.ciudad,
        address: dataForm.address,
        linkHowArrived: dataForm.linkHowArrived,
        scheduleRegular: dataForm.scheduleRegular,
        scheduleExtended: dataForm.scheduleExtended,
        isActive: dataForm.isActive,
      },
      { new: true }
    );

    if (!query)
      return NextResponse.json(
        { message: `Sede ${sucursalId} no encontrada` },
        { status: 404 }
      );

    return NextResponse.json(query);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
