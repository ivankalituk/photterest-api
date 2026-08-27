import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationDTO } from './dto/registration.dto';

@Controller('auth')
export class RegistrationController {
  constructor(private readonly registrationService: RegistrationService) {}

  @Post('register')
  register(@Body() dto: RegistrationDTO) {
    return this.registrationService.register(dto);
  }
}
