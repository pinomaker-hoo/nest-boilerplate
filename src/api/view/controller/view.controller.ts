// ** Nest Imports
import { Controller, Get, Render } from '@nestjs/common';

// ** Swagger Imports
import { ApiTags } from '@nestjs/swagger';

@ApiTags('View')
@Controller({ path: '/view', version: '1' })
export default class ViewController {
  constructor() {}

  @Get()
  @Render('index')
  public view() {
    return { message: 'Hello world' };
  }
}
