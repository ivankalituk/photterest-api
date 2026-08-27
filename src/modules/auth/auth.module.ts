import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule,

    JwtModule.register({
      secret: 'SUPER_SECRET_KEY',
      signOptions: {
        // пока не знаю насколько сделать
        expiresIn: '15m',
      },
    }),
  ],

  providers: [AuthService, JwtStrategy],

  controllers: [AuthController],

  exports: [AuthService],
})
export class AuthModule {}
