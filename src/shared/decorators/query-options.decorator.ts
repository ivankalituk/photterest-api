import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { QueryOptionsDTO } from "../dto/query-options.dto";

// decorator for pagination and order options

export const QueryOptions = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        let orderBy: any = undefined;

        const order = request.query.order || "asc";

        const sortableFields = [
            "inner_updated_at",
            "created_at",
            "name",
            "updated_at",
            "size"
        ];

        if (sortableFields.includes(request.query.orderBy)) {
            orderBy = {
                [request.query.orderBy]: order
            };
        }

        return {
            skip: (request.query.pageNumber - 1)*request.query.pageSize,
            take: request.query.pageSize,
            orderBy: orderBy
        };
    }
);