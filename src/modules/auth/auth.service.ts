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

    async googleLogin(token: string) {
        const ticket = await this.googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload?.sub || !payload.email) {
            throw new UnauthorizedException('Invalid Google account data');
        }

        if (!payload.email_verified) {
            throw new UnauthorizedException('Google email is not verified');
        }

        const existingGoogleUser = await this.prisma.users.findUnique({
            where: {
                google_id: payload.sub,
            },
        });

        if (existingGoogleUser) {
            const jwt = this.generateToken(existingGoogleUser);

            return {
                user: {
                    id: existingGoogleUser.id,
                    nickname: existingGoogleUser.nickname,
                    email: existingGoogleUser.email,
                    avatar_url: existingGoogleUser.avatar_url,
                    role: existingGoogleUser.role,
                },
                token: jwt,
            };
        }

        const existingEmailUser = await this.prisma.users.findUnique({
            where: {
                email: payload.email,
            },
        });

        if (existingEmailUser) {
            const updatedUser = await this.prisma.users.update({
                where: {
                    id: existingEmailUser.id,
                },
                data: {
                    google_id: payload.sub,
                },
            });

            const jwt = this.generateToken(updatedUser);

            return {
                user: {
                    id: updatedUser.id,
                    nickname: updatedUser.nickname,
                    email: updatedUser.email,
                    avatar_url: updatedUser.avatar_url,
                    role: updatedUser.role,
                },
                token: jwt,
            };
        }

        const newUser = await this.prisma.users.create({
            data: {
                nickname: payload.name ?? payload.email.split('@')[0],
                email: payload.email,
                google_id: payload.sub,
                password_hash: null,
                avatar_url: payload.picture ?? null,
            },
        });

        const jwt = this.generateToken(newUser);

        return {
            user: {
                id: newUser.id,
                nickname: newUser.nickname,
                email: newUser.email,
                avatar_url: newUser.avatar_url,
                role: newUser.role,
            },
            token: jwt,
        };
    }

}