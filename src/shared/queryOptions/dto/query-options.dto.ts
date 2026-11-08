import { Type } from "class-transformer";
import {
    IsIn,
    IsInt,
    IsOptional,
    IsPositive,
    IsString,
    Max
} from "class-validator";

export class QueryOptionsDTO {
    @IsOptional()
    @IsString()
    orderBy?: string;

    @Type(() => Number)
    @IsInt()
    @IsPositive()
    pageNumber: number = 1;

    @Type(() => Number)
    @IsInt()
    @IsPositive()
    @Max(100)
    pageSize: number = 10;

    @IsOptional()
    @IsIn(["asc", "desc"])
    order?: "asc" | "desc" = 'asc';
}