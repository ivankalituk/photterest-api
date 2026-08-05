import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "./dto/login.dto";
import { DatabaseService } from "../database/database.service";
import * as bcrypt from 'bcrypt'
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService{
    constructor(
        private jwtService: JwtService,
        private readonly databaseService: DatabaseService,
        private readonly prisma: PrismaService
    ) {}


    // обязательно сделать типизацию
    generateToken(user: any){
        const payload = {
            id: user.id,
            role: user.role
        }

        return this.jwtService.sign(payload)
    }

    async login(dto: LoginDTO){

        const user = await this.prisma.users.findUnique({where: {email: dto.email}})


        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (!user.password_hash) {
            throw new UnauthorizedException('You was logged in without password');
        }

        const isValid = await bcrypt.compare(
            dto.password,
            user.password_hash
        );

        if (!isValid) {
            throw new UnauthorizedException('Invalid password');
        }


        const token = this.generateToken(user)

        return {
            user: {
                id: user.id,
                nickname: user.nickname,
                email: user.email,
                role: user.role,
            },
            token,
        };
    }
}