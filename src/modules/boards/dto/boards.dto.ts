import { ArrayUnique, IsArray, IsBoolean, IsOptional, IsString, IsUUID, Length } from "class-validator";

export class BoardsDTO{
    @IsString()
    @Length(3, 50)
    name: string;

    @IsBoolean()
    private: boolean

    @IsOptional()
    @IsArray()
    @IsUUID("4", { each: true })
    @ArrayUnique()
    coauthors: string[];
}