import { IsBoolean, IsString } from "class-validator";

export class BoardsDTO{
    @IsString()
    name: string;

    @IsBoolean()
    private: boolean
}