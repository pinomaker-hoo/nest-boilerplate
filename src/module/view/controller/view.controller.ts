// ** Nest Imports
import { Controller, Get, Render } from '@nestjs/common';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Response Imports
import { createServerExceptionResponse } from '../../../global/response/common';

@ApiTags('View')
@ApiResponse(createServerExceptionResponse())
@Controller({ path: '/view', version: '1' })
export default class ViewController {
  constructor() {}

  @Get()
  @Render('index')
  public view() {
    return { message: 'Hello world' };
  }
}
