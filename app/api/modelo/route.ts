import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { dbConnect } from "@/lib";
import Marca from "@/models/Marca";
import Carroceria from "@/models/Carroceria";
import Modelo from "@/models/Modelo";
import { iModelo } from "@/types";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { userId } = auth();
    const data = await req.json();

    // console.log("server:", data);

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

    return NextResponse.json(query);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
