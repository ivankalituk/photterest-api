import { Injectable, UnauthorizedException, UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "./dto/login.dto";
import * as bcrypt from 'bcrypt'
import { PrismaService } from "src/prisma/prisma.service";
import { OAuth2Client } from "google-auth-library";

@Injectable()
export class AuthService{

    private googleClient = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID
    )
    
    constructor(
        private jwtService: JwtService,
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

    async logOut(user: any){
        console.log(user)

        return {message: "success"}
    }

    async googleLogin(token: string){
        const ticket = await this.googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        })

        const payload = ticket.getPayload()

        return payload
    }

}