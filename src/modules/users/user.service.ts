import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class UsersService{

    constructor(
        private readonly databaseService: DatabaseService
    ) {}

    async findById(id: string){
        const result = await this.databaseService.query(
            `
            SELECT
                id,
                nickname,
                email,
                avatar_url,
                role,
                created_at
            FROM users
            WHERE id = $1
            `,
            [id],
        );
        
        return result.rows[0]
    }
}