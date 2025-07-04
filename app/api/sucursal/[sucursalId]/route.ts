import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { dbConnect } from "@/lib";
import Sucursal from "@/models/Sucursal";
import { iSede } from "@/types";

export async function PATCH(
  req: Request,
  { params }: { params: { sucursalId: string } }
) {
  await dbConnect();

  try {
    const { userId } = await auth();
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
        marcasDisponiblesVentas: dataForm.marcasDisponiblesVentas,
        marcasDisponiblesTaller: dataForm.marcasDisponiblesTaller,
        coordenadasMapa: dataForm.coordenadasMapa,
        isActive: dataForm.isActive,
      } as iSede,
      { new: true }
    );

    if (!query)
      return NextResponse.json(
        { message: `Sede ${sucursalId} no encontrada` },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      message: `Sucursal actualizada con éxito ✅`,
      new: query,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { sucursalId: string } }
) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const { sucursalId } = params;

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const query = await Sucursal.findByIdAndDelete(sucursalId);

    if (!query)
      return NextResponse.json(
        { message: `Sede ${sucursalId} no encontrada` },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      message: `Sucursal eliminada ❌`,
      res: query,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
