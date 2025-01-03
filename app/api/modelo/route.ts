import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import Marca from "@/models/Marca";
import Carroceria from "@/models/Carroceria";
import Modelo from "@/models/Modelo";

import { dbConnect } from "@/lib";
import { iModelo } from "@/types";

export async function GET(req: Request) {
  await dbConnect();

  try {
    const query: iModelo[] = await Modelo.find({})
      .select(
        "_id name slug imageUrl precioBase marca carroceria isActive features colores galeria isLiquidacion isNuevo isEntrega48H isGLP"
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
    const data = await req.json();

    const brandFound = await Marca.findOne({ slug: data.marca });
    if (!brandFound)
      return NextResponse.json(
        { message: `Marca ${data.marca} no encontrada` },
        { status: 404 }
      );

    const chasisFound = await Carroceria.findOne({ slug: data.carroceria });
    if (!chasisFound)
      return NextResponse.json(
        { message: `Chasis ${data.carroceria} no encontrado` },
        { status: 404 }
      );

    if (!userId) return new NextResponse("No Autorizado", { status: 401 });

    const newModelo = new Modelo({
      ...data,
      createdBy: userId,
      marca: brandFound,
      carroceria: chasisFound,
    }) as iModelo;

    const query = await newModelo.save();

    return NextResponse.json({
      message: `Modelo ${data.name} creado con éxito`,
      obj: query,
    });
  } catch (err) {
    // console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
