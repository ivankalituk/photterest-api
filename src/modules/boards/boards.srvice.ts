import { BadRequestException, Injectable } from "@nestjs/common";
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

async createBoard(dto: BoardsDTO, user_id: string) {
    return await this.prisma.$transaction(async (tx) => {
        const coauthors = dto.coauthors.filter(id => id !== user_id);

        if (coauthors.length > 0) {
            const existingUsers = await tx.users.findMany({
                where: {
                    id: {
                        in: coauthors
                    }
                },
                select: {
                    id: true
                }
            });

            if (existingUsers.length !== coauthors.length) {
                throw new BadRequestException(
                    "SONE OF USERS DONT EXIST"
                );
            }
        }

        const board = await tx.boards.create({
            data: {
                creator_id: user_id,
                name: dto.name,
                private: dto.private
            }
        });

        if (coauthors.length > 0) {
            await tx.board_coauthors.createMany({
                data: coauthors.map(coauthor_id => ({
                    board_id: board.id,
                    user_id: coauthor_id
                }))
            });
        }

        return board;
    });
}
}