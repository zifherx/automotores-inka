import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { dbConnect } from "@/lib";

import { iModelo } from "@/types";
import { Carroceria, Marca, Modelo } from "@/models";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { modeloId: string } }
) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const { modeloId } = params;
    const { isActive } = await req.json();

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const query = await Modelo.findByIdAndUpdate(
      modeloId,
      { isActive: isActive },
      { new: true }
    );

    if (!query)
      return NextResponse.json(
        { message: `Modelo ${modeloId} no encontrado` },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      message: `Modelo actualizado ✅`,
      res: query,
    });
  } catch (err) {
    // console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { modeloId: string } }
) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const { modeloId } = params;

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const query = await Modelo.findByIdAndDelete(modeloId);

    if (!query)
      return NextResponse.json(
        { success: false, message: `Modelo ${modeloId} no encontrado` },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      message: `Modelo eliminado ❌`,
      res: query,
    });
  } catch (err) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { modeloId: string } }
) {
  await dbConnect();

  try {
    const { modeloId } = await params;

    const query = await Modelo.findOne({ slug: modeloId })
      .populate({
        path: "marca",
        model: Marca,
        select: "_id name slug imageUrl idNovaly",
      })
      .populate({
        path: "carroceria",
        model: Carroceria,
        select: "_id name slug",
      })
      .lean<iModelo[]>()
      .exec();

    if (!query)
      return NextResponse.json(
        {
          message: `Modelo ${modeloId} no existe`,
        },
        { status: 404 }
      );

    return NextResponse.json(query);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
