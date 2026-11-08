export interface QueryOptionsType {
    orderBy?: Record<string, "asc" | "desc">;
    skip: number,
    take: number
}