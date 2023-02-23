// ** Nest Imports
import { HttpStatus } from '@nestjs/common';

// ** Swagger Imports
import { ApiProperty } from '@nestjs/swagger';

export default class ApiResponse<T> {
  private constructor(payload: {
    readonly data?: T;
    readonly statusCode: number;
    readonly message: string;
  }) {
    this.data = payload?.data;
    this.statusCode = payload.statusCode;
    this.message = payload.message;
  }

  @ApiProperty()
  private readonly data?: T;
  @ApiProperty()
  private readonly statusCode: HttpStatus;
  @ApiProperty()
  private readonly message: string;

  static of<T>(payload: {
    readonly data?: T;
    readonly statusCode?: number;
    readonly message?: string;
  }): ApiResponse<T> {
    return new ApiResponse<T>({
      data: payload.data ?? null,
      statusCode: payload.statusCode ?? HttpStatus.OK,
      message: payload.message ?? '',
    });
  }
}
