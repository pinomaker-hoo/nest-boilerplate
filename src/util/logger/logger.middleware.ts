// ** Nest Imports
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from '@nestjs/common';

// ** Express Imports
import { Request, Response, NextFunction } from 'express';

@Injectable()
export default class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger();
  use(request: Request, response: Response, next: NextFunction) {
    const { method, originalUrl } = request;

    response.on('finish', () => {
      const { statusCode } = response;
      this.logger.log(`${method} ${statusCode} - ${originalUrl}`);
    });
    next();
  }
}
