import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { LoginDTO } from "./dto/login.dto";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class AuthService{
    constructor(
        private jwtService: JwtService,
        private readonly databaseService: DatabaseService
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
        const result = await this.databaseService.query(
            `SELECT * FROM users WHERE email = $1`,
            [dto.email],
        );

        const user = result.rows[0]

        if (!user){
            throw new UnauthorizedException('Invalid credetials');
        }

        if (user.password !== dto.password){
            throw new UnauthorizedException('Invalid Password')
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