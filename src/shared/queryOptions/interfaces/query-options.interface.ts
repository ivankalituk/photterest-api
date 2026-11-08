interface QueryOptionsType {
    orderBy?: Record<string, "asc" | "desc">;
    skip: number,
    take: number
}

export type {QueryOptionsType}