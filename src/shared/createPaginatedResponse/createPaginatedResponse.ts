import { PaginationResponseType } from "./interfaces";

export function createPaginatedResponse<T>(
    data: T[],
    totalElements: number,
    pageNumber: number,
    pageSize: number
): PaginationResponseType<T>{
    const totalPages = Math.ceil(totalElements / pageSize)

    return {
        data,
        totalPages,
        totalElements,
        pageNumber,
        pageElements: data.length,
        isLast: pageNumber >= totalPages,
        isFirst: pageNumber === 1
    }
}