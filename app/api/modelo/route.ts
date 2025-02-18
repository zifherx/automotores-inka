import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { Marca } from "@/models/Marca";
import Carroceria from "@/models/Carroceria";
import Modelo from "@/models/Modelo";

import { dbConnect } from "@/lib";
import { iModelo } from "@/types";

export async function GET(req: Request) {
  await dbConnect();

  try {
    const query: iModelo[] = await Modelo.find({})
      .select(
        "_id name slug imageUrl precioBase marca carroceria isActive features colores galeria isLiquidacion isNuevo isEntrega48H isGLP codigo_flashdealer"
      )
      .populate([
        {
          path: "marca",
          select: "_id name slug imageUrl",
        },
        {
          path: "carroceria",
          select: "_id name slug",
        },
      ]);

    return NextResponse.json({ total: query.length, obj: query });
  } catch (err) {
    // console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { userId } = await auth();
    const dataForm = await req.json();

    const brandFound = await Marca.findOne({ slug: dataForm.marca });
    if (!brandFound)
      return NextResponse.json(
        { message: `Marca ${dataForm.marca} no encontrada` },
        { status: 404 }
      );

    const chasisFound = await Carroceria.findOne({ slug: dataForm.carroceria });
    if (!chasisFound)
      return NextResponse.json(
        { message: `Chasis ${dataForm.carroceria} no encontrado` },
        { status: 404 }
      );

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const newModelo = new Modelo({
      ...dataForm,
      createdBy: userId,
      marca: brandFound,
      carroceria: chasisFound,
    }) as iModelo;

    const query = await newModelo.save();

    return NextResponse.json({
      message: `Modelo ${dataForm.name} creado ✅`,
      obj: query,
    });
  } catch (err) {
    // console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
