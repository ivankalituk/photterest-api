import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class UsersService{

    constructor(
        private readonly prisma: PrismaService
    ) {}

    async findById(id: number){
        const user = await this.prisma.users.findUnique(
            {
                where: {id: id},
                select: {
                    id: true,
                    nickname: true,
                    email: true,
                    avatar_url: true,
                    role: true,
                    created_at: true,
                    updated_at: true
                }
            }
        )
        
        return user
    }
}