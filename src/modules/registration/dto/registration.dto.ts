import { IsEmail, IsString, Length } from "class-validator";

export class RegistrationDTO{
    @IsEmail()
    email: string

    @IsString()
    @Length(6, 50)
    password: string
}