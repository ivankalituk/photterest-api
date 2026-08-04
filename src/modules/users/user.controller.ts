import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { UsersService } from "./user.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('users')
export class UsersController{
    constructor(
        private readonly usersService: UsersService
    ){}

    @UseGuards(JwtAuthGuard)
    @Get('me')
    getMe(@Req() req: any){
        return this.usersService.findById(req.user.id)
    }
}