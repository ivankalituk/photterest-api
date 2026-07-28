import { Injectable } from "@nestjs/common";
import { DatabaseService } from "../database/database.service";

@Injectable()
export class TestService{

    constructor(
        private databaseService: DatabaseService
    ){}

    async create(name: string){
        const result = await this.databaseService.query(`
            INSERT INTO users(name) VALUES ($1) RETURNING *`, [name])
    
        return result.rows[0]
    }

    async getAll(){
        const result = await this.databaseService.query(`SELECT * FROM users`)

        return result.rows
    }

}