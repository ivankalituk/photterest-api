import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { BoardsDTO } from "./dto/boards.dto";

@Injectable()
export class BoardsService {
    constructor (private readonly prisma: PrismaService) {}

    async getAll(){
        const boards = await this.prisma.boards.findMany()

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
            where: {user_id: user_id}
        })

        return boards
    }

    async createBoard(dto: BoardsDTO, user_id: string){
        const board = await this.prisma.boards.create({
            data: {
                user_id: user_id,
                name: dto.name,
                private: dto.private
            }
        });

        return board
    }
}