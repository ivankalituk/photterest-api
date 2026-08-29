import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';

import { RegistrationService } from './registration.service';
import { RegistrationDTO } from './dto/registration.dto';

@Controller('auth')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
  ) {}

  @Post('register')
  async register(
    @Body() dto: RegistrationDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } =
      await this.registrationService.register(dto);

    res.cookie('access_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return {
      user,
    };
  }
}