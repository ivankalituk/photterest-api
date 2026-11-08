import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { BoardsDTO } from "./dto/boards.dto";
import { QueryOptionsType } from "src/shared/interfaces/query-options.interface";

@Injectable()
export class BoardsService {
    constructor (private readonly prisma: PrismaService) {}

    async getAll(options: QueryOptionsType){
        const boards = await this.prisma.boards.findMany({
                orderBy: options.orderBy,
                skip: options.skip,
                take: options.take
            }
        )

        return boards
    }

    async getById(id: string){
        const boards = await this.prisma.boards.findUnique({
            where: {id: id}
        })

        return boards
    }

    async getByUser(user_id: string){
        const boards = await this.prisma.boards.findMany({
            where: {creator_id: user_id}
        })

        return boards
    }

    async createBoard(dto: BoardsDTO, user_id: string){
        const board = await this.prisma.boards.create({
            data: {
                creator_id: user_id,
                name: dto.name,
                private: dto.private
            }
        });

        return board
    }
}