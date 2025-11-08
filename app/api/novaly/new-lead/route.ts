import { NovalyController } from "@/controllers/novaly.controller";
import { withApiLoggerBasic } from "@/middleware/api-logger.middlewaer";

const controller = new NovalyController();

export const POST = withApiLoggerBasic(controller.handlePost.bind(controller));
