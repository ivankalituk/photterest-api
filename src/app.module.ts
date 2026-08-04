import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { UsersModule } from './modules/users/user.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        DatabaseModule,
        RegistrationModule,
        UsersModule
    ],

    controllers: [
        AppController
    ],

    providers: [
        AppService
    ],
})
export class AppModule {}