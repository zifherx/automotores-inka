import { dbConnect } from "@/lib";
import Concurso from "@/models/Concurso";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { nameContest: string } }
) {
  await dbConnect();

  try {
    const { nameContest } = params;

    const query = await Concurso.findOne({ title: nameContest });

    return NextResponse.json(query);
  } catch (err) {
    // console.log(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
