import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { BoardsDTO } from "./dto/boards.dto";
import type { QueryOptionsType } from "src/shared/queryOptions/interfaces/query-options.interface";
import { createPaginatedResponse } from "src/shared/createPaginatedResponse/createPaginatedResponse";

@Injectable()
export class BoardsService {
    constructor (private readonly prisma: PrismaService) {}

    async getAll(options: QueryOptionsType){
    const where = { deleted: false };

        const [boards, totalElements] = await Promise.all([
            this.prisma.boards.findMany({
                where,
                orderBy: options.orderBy,
                skip: options.skip,
                take: options.take
            }),
            this.prisma.boards.count({ where })
        ]);

        return createPaginatedResponse(
            boards,
            totalElements,
            options.skip / options.take + 1,
            options.take
        )
    }

    async getById(id: string){
        const boards = await this.prisma.boards.findUnique({
            where: {id: id}
        })

        return boards
    }

    async getByUser(user_id: string, options: QueryOptionsType){

        const where = {
            deleted: false,
            creator_id: user_id
        };

        const [boards, totalElements] = await Promise.all([
            this.prisma.boards.findMany({
                where,
                orderBy: options.orderBy,
                skip: options.skip,
                take: options.take
            }),
            this.prisma.boards.count({ where })
        ])

        return createPaginatedResponse(
            boards,
            totalElements,
            options.skip / options.take + 1,
            options.take
        )
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