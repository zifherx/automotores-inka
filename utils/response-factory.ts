import { NextResponse } from "next/server";

import { AppError } from "@/lib";

import { APIResponse, ErrorResponse } from "@/types";

export class ResponseFactory {
  static success<T>(data: T, message: string): NextResponse<APIResponse<T>> {
    return NextResponse.json(
      {
        success: true,
        data,
        message,
      },
      { status: 200 }
    );
  }

  static error(error: AppError | Error): NextResponse<ErrorResponse> {
    const statusCode = error instanceof AppError ? error.statusCode : 500;

    return NextResponse.json(
      {
        success: false,
        message: error.message,
        ...(process.env.APP_ENV === "development" && {
          error: error.stack,
        }),
      },
      {
        status: statusCode,
      }
    );
  }
}
