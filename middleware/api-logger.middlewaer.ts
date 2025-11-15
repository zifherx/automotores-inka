import { NextRequest, NextResponse } from "next/server";
import { LogData, OptionsLoggerAdvanced } from "@/interfaces";

export function withApiLoggerBasic(
  handler: (req: NextRequest) => Promise<NextResponse>
) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const startTime = Date.now();
    const timestamp = new Date().toISOString();

    const logData: Partial<LogData> = {
      method: req.method,
      url: req.url,
      userAgent: req.headers.get("user-agent") || undefined,
      ip:
        req.headers.get("x-forwarded-for") ||
        req.headers.get("x-real-ip") ||
        "unknown",
      timestamp,
    };

    try {
      console.log(`🚀 [${timestamp}] ${req.method} ${req.url} - Started`);

      const response = await handler(req);
      const duration = Date.now() - startTime;

      const finalLogData: LogData = {
        ...(logData as LogData),
        duration,
        status: response.status,
      };

      // Log Exitoso
      console.log(
        `✅ ${timestamp} ${req.method} ${req.url} - ${response.status} - ${duration}ms`
      );

      if (duration > 5000) {
        console.warn(
          `⚠️ [SLOW REQUEST] ${req.method} ${req.url} - ${duration}ms`
        );
      }

      return response;
    } catch (err) {
      const duration = Date.now() - startTime;
      const errorMessage = err instanceof Error ? err.message : "Unknown error";

      const finalLogData: LogData = {
        ...(logData as LogData),
        duration,
        status: 500,
        error: errorMessage,
      };

      console.error(
        `❌ [${timestamp}] ${req.method} ${req.url} - ERROR - ${duration}ms:`,
        errorMessage
      );
      throw err;
    }
  };
}

export function withApiLoggerAdvanced(options: OptionsLoggerAdvanced = {}) {
  return function (handler: (req: NextRequest) => Promise<NextResponse>) {
    return async (req: NextRequest): Promise<NextResponse> => {
      const startTime = Date.now();
      const timestamp = new Date().toISOString();

      const {
        logBody = false,
        logHeaders = false,
        excludeHeaders = ["authorization", "cookie"],
        maxBodyLength = 1000,
      } = options;

      try {
        let requestBody = "";
        if (logBody && req.body) {
          try {
            const clonedRequest = req.clone();
            const body = await clonedRequest.text();
            requestBody =
              body.length > maxBodyLength
                ? body.substring(0, maxBodyLength) + "..."
                : body;
          } catch (e) {
            requestBody = "Unable to read body";
          }
        }

        let headers = {};
        if (logHeaders) {
          headers = Object.fromEntries(
            Array.from(req.headers.entries()).filter(
              ([key]) => !excludeHeaders.includes(key.toLowerCase())
            )
          );
        }

        console.log(`🚀 [${timestamp}] ${req.method} ${req.url} - Started`, {
          ...(logBody && { body: requestBody }),
          ...(logHeaders && { headers }),
        });

        const response = await handler(req);
        const duration = Date.now() - startTime;

        console.log(
          `✅ [${timestamp}] ${req.method} ${req.url} - ${response.status} - ${duration}ms`
        );

        return response;
      } catch (err) {
        const duration = Date.now() - startTime;
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";

        console.error(
          `❌ [${timestamp}] ${req.method} ${req.url} - ERROR - ${duration}ms`,
          errorMessage
        );

        throw err;
      }
    };
  };
}
