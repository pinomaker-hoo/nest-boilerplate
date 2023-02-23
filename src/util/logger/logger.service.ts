// ** Nest Imports
import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export default class LoggerService implements NestLoggerService {
  debug(message: any, ...optionalParams: any[]) {
    console.debug(`[Debug] ${message}`, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    console.warn(`[Warning]  ${message}`, ...optionalParams);
  }

  log(message: any, ...optionalParams: any[]) {
    console.log(`[Log] ${message}`, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    console.error(`[Error] ${message}`, ...optionalParams);
  }
}
