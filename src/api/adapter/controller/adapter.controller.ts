// ** Nest Imports
import { Controller } from '@nestjs/common';

// ** Swagger Imports
import { ApiTags } from '@nestjs/swagger';

// ** Custom Module Imports
import AdapterService from '../service/adapter.service';

@ApiTags('Adapter')
@Controller({ path: '/adapter', version: '1' })
export default class AdapterController {
  constructor(private readonly adapterService: AdapterService) {}
}
