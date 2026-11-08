import { Body, Controller, Get, Param, Post, Req, UseGuards, ValidationPipe } from "@nestjs/common";
import { BoardsService } from "./boards.srvice";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { JwtUser } from "../auth/interfaces/jwt-user.interface";
import { BoardsDTO } from "./dto/boards.dto";
import { QueryOptions } from "src/shared/decorators/query-options.decorator";
import { QueryOptionsDTO } from "src/shared/dto/query-options.dto";
import { QueryOptionsType } from "src/shared/interfaces/query-options.interface";

// refactor this
interface AuthenticatedRequest extends Request {
  user: JwtUser;
}

@Controller('boards')
export class BoardsController {
    
    constructor (private readonly boardsService: BoardsService) {}

    @Get()
    getAll(
        @QueryOptions(new ValidationPipe({ transform: true }))
        options: QueryOptionsType
    ) {
        return this.boardsService.getAll(options);
    }

    @UseGuards(JwtAuthGuard)
    @Get('mine')
    getMine(@Req() req: AuthenticatedRequest){
        return this.boardsService.getByUser(req.user.id)
    }

    @Get(':id')
    getUnique(@Param('id') id: string){
        return this.boardsService.getById(id)
    }

    @Get('by-user/:id')
    getByUser(@Param('id') id: string){
        return this.boardsService.getByUser(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createBoard(
        @Body() dto: BoardsDTO,
        @Req() req: AuthenticatedRequest, ){
        return this.boardsService.createBoard(dto, req.user.id)
    }
}