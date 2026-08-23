import { BadRequestException, Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { AuthService } from "../auth/auth.service";
import { RegistrationDTO } from "./dto/registration.dto";
import * as bcrypt from 'bcrypt'
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RegistrationService{

    constructor(
        private readonly prisma: PrismaService,
        private authService: AuthService
    ) {}

    async register(
        dto: RegistrationDTO
    ) {

        const existingUser = await this.prisma.users.findUnique({where: {email: dto.email}})


        if (existingUser){
            throw new BadRequestException('Email already exists')
        }
        
        const hashedPassword = await bcrypt.hash(dto.password, 10)

        const user = await this.prisma.users.create({
            data: {
                nickname: dto.nickname,
                email: dto.email,
                password_hash: hashedPassword
            },
            select: {
                id: true,
                nickname: true,
                email: true,
                avatar_url: true,
                role: true,
                created_at: true,
                updated_at: true
            }
        })

        const token = this.authService.generateToken(user)

        return {
            user:{
                id: user.id,
                nickname:user.nickname,
                email:user.email,
                role:user.role
            },

            token
        };
    }
}