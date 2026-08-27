import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { RegistrationController } from './registration.controller';
import { RegistrationService } from './registration.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],

  controllers: [RegistrationController],

  providers: [RegistrationService],
})
export class RegistrationModule {}
