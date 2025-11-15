import { FlashDealerController } from "@/controllers/flash-dealer.controller";
import { withApiLoggerBasic } from "@/middleware/api-logger.middlewaer";

const controller = new FlashDealerController();

export const POST = withApiLoggerBasic(controller.handlePost.bind(controller));
