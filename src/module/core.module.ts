// ** Nest Imports
import { Module } from '@nestjs/common';

// ** Custom Module Imports
import AuthModule from './auth/auth.module';
import UploadModule from './upload/upload.module';
import ViewModule from './view/view.module';
import AdapterModule from './adapter/adapter.module';

@Module({
  imports: [AuthModule, UploadModule, ViewModule, AdapterModule],
  controllers: [],
  providers: [],
})
export class CoreModule {}
