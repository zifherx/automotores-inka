import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { dbConnect } from "@/lib";

import Modelo from "@/models/Modelo";

export async function PATCH(
  req: Request,
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

    return NextResponse.json(query);
  } catch (err) {
    // console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
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
        { message: `Modelo ${modeloId} no encontrado` },
        { status: 404 }
      );

    return NextResponse.json(query);
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
    const { modeloId } = params;

    const query = await Modelo.findOne({ slug: modeloId })
      .populate({ path: "marca", select: "_id name slug imageUrl" })
      .populate({
        path: "carroceria",
        select: "_id name slug",
      });

    if (!query)
      return NextResponse.json(
        {
          message: `Modelo ${modeloId} no existe`,
        },
        { status: 404 }
      );

    return NextResponse.json(query);
  } catch (err) {
    // console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
