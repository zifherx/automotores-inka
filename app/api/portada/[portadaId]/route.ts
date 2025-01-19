import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { dbConnect } from "@/lib";
import Cover from "@/models/Cover";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { portadaId: string } }
) {
  await dbConnect();
  let query;

  try {
    const { userId } = await auth();
    const { portadaId } = params;
    const payload = await req.json();

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const coverFounded = await Cover.findById(portadaId);

    if (!coverFounded)
      return NextResponse.json(
        { message: `Portada ${portadaId} no encontrada` },
        { status: 404 }
      );

    const respuestaValidacion = validarPortada(
      coverFounded.imageUrl,
      payload.imageUrl
    );

    if (!respuestaValidacion) {
      query = await Cover.findByIdAndUpdate(
        portadaId,
        { ...payload },
        { new: true }
      );
    } else {
      query = await Cover.findByIdAndUpdate(
        portadaId,
        {
          name: payload.name,
          slug: payload.slug,
          isActive: payload.isActive,
        },
        { new: true }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Portada actualizada con éxito ✅",
      res: query,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { portadaId: string } }
) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const { portadaId } = params;

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const query = await Cover.findByIdAndDelete(portadaId);

    if (!query) {
      return NextResponse.json(
        {
          message: `Portada no encontrada`,
        },
        { status: 404 }
      );
    }

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

const validarPortada = (uriDB: string, uriPayload: string): boolean => {
  if (uriDB === uriPayload) {
    return true;
  }
  return false;
};
