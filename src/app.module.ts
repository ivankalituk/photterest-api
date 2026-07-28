import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { TestModule } from './modules/test/test.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        DatabaseModule,
        TestModule
    ],

    controllers: [
        AppController
    ],

    providers: [
        AppService
    ],
})
export class AppModule {}