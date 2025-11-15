import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { Carroceria, Marca, Modelo } from "@/models";

import { dbConnect } from "@/lib";
import { iModelo } from "@/types";

export async function GET(req: Request) {
  await dbConnect();

  try {
    const query = await Modelo.find({})
      .select(
        "_id name slug imageUrl precioBase marca carroceria isActive features colores galeria isLiquidacion isNuevo isEntrega48H isGLP codigo_flashdealer"
      )
      .populate([
        {
          path: "marca",
          model: Marca,
          select: "_id name slug imageUrl",
        },
        {
          path: "carroceria",
          model: Carroceria,
          select: "_id name slug",
        },
      ])
      .lean<iModelo[]>()
      .exec();

    return NextResponse.json({ total: query.length, obj: query });
  } catch (err: any) {
    console.log(err.message);
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
  } catch (err: any) {
    console.log(err.message);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
