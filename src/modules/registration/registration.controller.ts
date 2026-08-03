import { Body, Controller, Post } from "@nestjs/common";
import { RegistrationService } from "./registration.service";

@Controller('auth')
export class RegistrationController {

    constructor(
        private readonly registrationService: RegistrationService
    ) {}


    @Post('register')
    register(
        @Body() body: {
            nickname: string;
            email: string;
            password: string;
        },
    ) {
        return this.registrationService.register(
            body.nickname,
            body.email,
            body.password,
        );
    }
}