import { BadRequestException, Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";
import { AuthService } from "../auth/auth.service";
import { RegistrationDTO } from "./dto/registration.dto";

@Injectable()
export class RegistrationService{

    constructor(
        private readonly databaseService: DatabaseService,
        private authService: AuthService
    ) {}

    async register(
        dto: RegistrationDTO
    ) {
        const existingUser = await this.databaseService.query(`SELECT id FROM users WHERE email = $1`, [dto.email])

        if (existingUser.rows.length > 0){
            throw new BadRequestException('Email already exists')
        }
        
        const result = await this.databaseService.query(
            `
            INSERT INTO users (nickname, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, nickname, email, avatar_url, role, created_at
            `,
            [dto.nickname, dto.email, dto.password],
        )

        const user = result.rows[0];

        const token = this.authService.generateToken(user)

        return {
            user:{
                id:user.id,
                nickname:user.nickname,
                email:user.email,
                role:user.role
            },

            token
        };
    }


}