import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(
        private jwtService: JwtService
    ) {}


    // обязательно сделать типизацию
    generateToken(user: any){
        const payload = {
            id: user.id,
            role: user.role
        }

        return this.jwtService.sign(payload)
    }
}