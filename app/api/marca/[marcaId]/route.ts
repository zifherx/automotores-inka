import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { MarcaService } from "@/services/marca.services";
import { MongooseMarcaRepositoryImplement } from "@/repositories/implementations/mongoose/marca.repository";
import { DIContainer } from "@/config/di-container";
import { ResponseFactory } from "@/utils/response-factory";
import { APIMessages } from "@/utils/constants";

import { Marca } from "@/models/Marca";
import { dbConnect, UnauthorizedError } from "@/lib";

const RESOURCE_NAME = "Marca";

const container = DIContainer.getInstance();
const marcaRepository = new MongooseMarcaRepositoryImplement(Marca);
container.register("IMarcaRepository", marcaRepository);
const marcaService = new MarcaService(container.get("IMarcaRepository"));

export async function PATCH(
  req: Request,
  { params }: { params: { marcaId: string } }
) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const { marcaId } = params;
    const body = await req.json();

    if (!userId) throw new UnauthorizedError("No autorizado");

    const query = await marcaService.updateResource(marcaId, body);
    return ResponseFactory.success(
      query,
      APIMessages.getUpdatedMessage(RESOURCE_NAME)
    );
  } catch (err: any) {
    return ResponseFactory.error(err);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { marcaId: string } }
) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const { marcaId } = params;

    if (!userId) throw new UnauthorizedError("No autorizado");

    const query = await marcaService.deleteResource(marcaId);

    return ResponseFactory.success(
      query,
      APIMessages.getDeletedMessage(RESOURCE_NAME)
    );
  } catch (err: any) {
    return ResponseFactory.error(err);
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { marcaId: string } }
) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const { marcaId } = params;

    if (!userId) throw new UnauthorizedError("No autorizado");
    const query = await marcaService.getResource(marcaId);
    return ResponseFactory.success(
      query,
      APIMessages.getFetchedMessage(RESOURCE_NAME)
    );
  } catch (err: any) {
    return ResponseFactory.error(err);
  }
}
