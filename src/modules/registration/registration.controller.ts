import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { RegistrationService } from "./registration.service";
import { RegistrationDTO } from "./dto/registration.dto";
import { AuthService } from "../auth/auth.service";
import { LoginDTO } from "../auth/dto/login.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller('auth')
export class RegistrationController {

    constructor(
        private readonly registrationService: RegistrationService,
        private readonly authService: AuthService
    ) {}


    @Post('register')
    register(
        @Body() dto: RegistrationDTO
    ) {
        return this.registrationService.register(dto);
    }

    @Post('login')
    login(
        @Body() dto: LoginDTO
    ) {
        return this.authService.login(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout(@Req() req: any)
    {return this.authService.logOut(req.user)}
}