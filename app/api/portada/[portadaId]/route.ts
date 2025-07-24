import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { DIContainer } from "@/config/di-container";
import { MongoosePortadaRepositoryImplement } from "@/repositories/implementations/mongoose/portada.repository";
import { PortadaService } from "@/services/portada.services";
import { ResponseFactory } from "@/utils/response-factory";
import { APIMessages } from "@/utils/constants";

import { dbConnect, UnauthorizedError } from "@/lib";
import { Cover } from "@/models";

const RESOURCE_NAME = "Portada";

const container = DIContainer.getInstance();
const portadaRepository = new MongoosePortadaRepositoryImplement(Cover);
container.register("IPortadaRepository", portadaRepository);
const portadaService = new PortadaService(container.get("IPortadaRepository"));

export async function PATCH(
  req: NextRequest,
  { params }: { params: { portadaId: string } }
) {
  await dbConnect();

  const { userId } = await auth();
  const { portadaId } = params;
  const body = await req.json();

  try {
    if (!userId) throw new UnauthorizedError("No autorizado");
    const query = await portadaService.updateResource(portadaId, body);
    console.log("Q: ", query);
    return ResponseFactory.success(
      query,
      APIMessages.getUpdatedMessage(RESOURCE_NAME)
    );
  } catch (err: any) {
    console.error(err);
    console.error(err.message);
    return ResponseFactory.error(err);
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

    if (!userId) throw new UnauthorizedError("No autorizado");
    const query = await portadaService.deleteResource(portadaId);

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
  { params }: { params: { portadaId: string } }
) {
  await dbConnect();

  try {
    const { userId } = await auth();
    const { portadaId } = params;

    if (!userId) throw new UnauthorizedError("No autorizado");
    const query = await portadaService.getResource(portadaId);

    console.log("Q: ", query);

    return ResponseFactory.success(
      query,
      APIMessages.getFetchedMessage(RESOURCE_NAME)
    );
  } catch (err: any) {
    console.error(err);
    console.error(err.message);
    return ResponseFactory.error(err);
  }
}
