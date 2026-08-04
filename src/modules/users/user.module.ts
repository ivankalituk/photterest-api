import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UsersController } from "./user.controller";
import { UsersService } from "./user.service";

@Module({
    imports: [DatabaseModule],

    controllers: [UsersController],

    providers: [UsersService]
})

export class UsersModule{}