import { IsEmail, IsString, Length } from "class-validator";

export class RegistrationDTO{
    @IsString()
    @Length(3, 30)
    nickname: string

    @IsEmail()
    email: string

    @IsString()
    @Length(6, 50)
    password: string
}