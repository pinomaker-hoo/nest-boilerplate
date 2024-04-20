// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Swagger Imports
import { ApiResponse, ApiTags } from '@nestjs/swagger';

// ** Custom Module Imports
import AdapterService from '../service/adapter.service';

// ** Response Imports
import { createServerExceptionResponse } from '../../../global/response/common';

@ApiTags('Adapter')
@ApiResponse(createServerExceptionResponse())
@Controller({ path: '/adapter', version: '1' })
export default class AdapterController {
  constructor(private readonly adapterService: AdapterService) {}
}
