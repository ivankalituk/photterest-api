import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { BoardsService } from "./boards.srvice";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { JwtUser } from "../auth/interfaces/jwt-user.interface";
import { BoardsDTO } from "./dto/boards.dto";
import { QueryOptionsPipe } from "src/shared/queryOptions/pipes/query-options.pipe";
import type { QueryOptionsType } from "src/shared/queryOptions/interfaces/query-options.interface";

// refactor this
interface AuthenticatedRequest extends Request {
  user: JwtUser;
}

@Controller('boards')
export class BoardsController {
    
    constructor (private readonly boardsService: BoardsService) {}

    @Get()
    getAll(
        @Query(QueryOptionsPipe) options: QueryOptionsType
    ) {
        return this.boardsService.getAll(options);
    }

    @UseGuards(JwtAuthGuard)
    @Get('mine')
    getMine(
        @Req() req: AuthenticatedRequest,  
        @Query(QueryOptionsPipe) options: QueryOptionsType
    ){
        return this.boardsService.getByUser(req.user.id, options)
    }

    @Get(':id')
    getUnique(@Param('id') id: string){
        return this.boardsService.getById(id)
    }

    @Get('by-user/:id')
    getByUser(
        @Param('id') id: string,
         @Query(QueryOptionsPipe) options: QueryOptionsType
    ){
        return this.boardsService.getByUser(id, options)
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createBoard(
        @Body() dto: BoardsDTO,
        @Req() req: AuthenticatedRequest, ){
        return this.boardsService.createBoard(dto, req.user.id)
    }
}