import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { TestController } from "./test.controller";
import { TestService } from "./test.service";

@Module({
    imports: [
        DatabaseModule
    ],

    controllers:[
        TestController
    ],

    providers: [
        TestService
    ]
})

export class TestModule{}