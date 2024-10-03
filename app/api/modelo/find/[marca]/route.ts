import { NextResponse } from "next/server";

import { dbConnect } from "@/lib";
import Modelo from "@/models/Modelo";
import Marca from "@/models/Marca";
import { iModelo } from "@/types";

export async function GET(
  req: Request,
  { params }: { params: { marca: string } }
) {
  const { marca } = params;
  await dbConnect();

  try {
    const marcaFound = await Marca.findOne({ slug: marca });

    if (!marcaFound)
      return NextResponse.json(
        { message: `Marca ${marca} no encontrada` },
        { status: 404 }
      );

    const modelFound: iModelo[] = await Modelo.find({
      marca: marcaFound._id,
    })
      .sort({ name: 1 })
      .populate({
        path: "marca",
        select: "name slug imageUrl",
      });

    return NextResponse.json(modelFound);
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
