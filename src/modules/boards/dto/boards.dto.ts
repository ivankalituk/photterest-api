import { IsBoolean, IsString, Length } from "class-validator";

export class BoardsDTO{
    @IsString()
    @Length(3, 50)
    name: string;

    @IsBoolean()
    private: boolean
}