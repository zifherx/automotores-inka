import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Marca from "@/models/Marca";

import { dbConnect, validarItem } from "@/lib";
import { iBrand } from "@/types";

export async function PATCH(
  req: Request,
  { params }: { params: { marcaId: string } }
) {
  await dbConnect();
  let query;

  try {
    const { userId } = await auth();
    const { marcaId } = params;
    const payload: iBrand = await req.json();

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const marcaFound: iBrand | null = await Marca.findById(marcaId);

    if (!marcaFound)
      return NextResponse.json(
        { success: false, message: `Marca ${marcaId} no encontrada` },
        { status: 404 }
      );

    const validacion = validarItem(marcaFound.imageUrl, payload.imageUrl);

    if (!validacion) {
      query = await Marca.findByIdAndUpdate(
        marcaId,
        { ...payload },
        { new: true }
      );
    } else {
      query = await Marca.findByIdAndUpdate(
        marcaId,
        {
          name: payload.name,
          slug: payload.slug,
          isActive: payload.isActive,
        },
        {
          new: true,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Marca actualizada ✅`,
      res: query,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { brandId: string } }
) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const { brandId } = params;

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const query = await Marca.findByIdAndDelete(brandId);

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          message: `Portada no encontrada`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Marca eliminada ❌`,
      res: query,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
