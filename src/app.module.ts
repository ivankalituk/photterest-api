import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { UsersModule } from './modules/users/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { BoardsModule } from './modules/boards/boards.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    DatabaseModule,
    RegistrationModule,
    UsersModule,
    AuthModule,
    BoardsModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
