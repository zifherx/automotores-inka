import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

import { MongooseMarcaRepositoryImplement } from "@/repositories/implementations/mongoose/marca.repository";
import { MarcaService } from "@/services/marca.service";
import { DIContainer } from "@/config/di-container";
import { ResponseFactory } from "@/utils/response-factory";
import { APIMessages } from "@/utils/constants";

import { dbConnect, UnauthorizedError } from "@/lib";
import { Marca } from "@/models";

const RESOURCE_NAME = "Marca";

const container = DIContainer.getInstance();
const marcaRepository = new MongooseMarcaRepositoryImplement(Marca);
container.register("IMarcaRepository", marcaRepository);
const marcaService = new MarcaService(container.get("IMarcaRepository"));

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const { userId } = await auth();
    const body = await req.json();

    if (!userId) throw new UnauthorizedError("No autorizado");
    const query = await marcaService.createResource(body);
    return ResponseFactory.success(
      query,
      APIMessages.getCreateMessage(RESOURCE_NAME)
    );
  } catch (err: any) {
    return ResponseFactory.error(err);
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const { searchParams } = req.nextUrl;
    const params = Object.fromEntries(searchParams);

    const query = await marcaService.getResources(params);
    return ResponseFactory.success(
      query,
      APIMessages.getListedMessage(RESOURCE_NAME)
    );
  } catch (err: any) {
    return ResponseFactory.error(err);
  }
}
