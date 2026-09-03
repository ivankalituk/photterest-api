import { Module } from "@nestjs/common";
import { BoardsController } from "./boards.controller";
import { BoardsService } from "./boards.srvice";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports: [PrismaModule],

    controllers: [BoardsController],

    providers: [BoardsService]
})

export class BoardsModule {}