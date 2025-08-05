import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiError(status: number, message: string, path: string = '') {
  return applyDecorators(
    ApiResponse({
      status,
      description: message,
      schema: {
        example: {
          statusCode: status,
          message,
          path: path,
          timestamp: new Date().toISOString(),
          requestId: 'abc-xyz-id'
        },
      },
    }),
  );
}
