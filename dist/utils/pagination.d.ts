export interface PaginationParams {
    page?: number;
    limit?: number;
}
export interface PaginationResult {
    skip: number;
    take: number;
    page: number;
    limit: number;
}
export declare const getPagination: (params: PaginationParams) => PaginationResult;
export declare const getPaginationMeta: (page: number, limit: number, total: number) => {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};
//# sourceMappingURL=pagination.d.ts.map