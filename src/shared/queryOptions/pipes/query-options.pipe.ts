import { BadRequestException, PipeTransform } from "@nestjs/common";
import { QueryOptionsType } from "../interfaces/query-options.interface";
import { plainToInstance } from "class-transformer";
import { QueryOptionsDTO } from "../dto/query-options.dto";
import { validate } from "class-validator";

export class QueryOptionsPipe implements PipeTransform {
    async transform(value: unknown): Promise<QueryOptionsType> {
        const dto = plainToInstance(QueryOptionsDTO, value);

        const errors = await validate(dto, {
            whitelist: true
        });
        
        if (errors.length > 0) {
            throw new BadRequestException(errors);
        }

        return {
            skip: (dto.pageNumber - 1) * dto.pageSize,
            take: dto.pageSize,
            orderBy: dto.orderBy
                ? { [dto.orderBy]: dto.order ?? "asc" }
                : undefined
        }
    }
}