import { BadRequestException, Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class RegistrationService{

    constructor(
        private readonly databaseService: DatabaseService
    ) {}

    async register(
        nickname: string,
        email: string,
        password: string
    ) {
        const existingUser = await this.databaseService.query(`SELECT id FROM users WHERE email = $1`, [email])

        if (existingUser.rows.length > 0){
            throw new BadRequestException('Email already exists')
        }
        
        const result = await this.databaseService.query(
            `
            INSERT INTO users (nickname, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, nickname, email, avatar_url, role, created_at
            `,
            [nickname, email, password],
        )

        return result.rows[0]
    }


}