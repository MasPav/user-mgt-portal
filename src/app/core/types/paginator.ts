export type paginationDataTypes = 'laravel' | 'vagoApi';

export interface Paginator {
    collectionSize?: number;
    page?: number;
    total?: number;
    from?: number;
    to?: number;
    perPage?: number;
    disabled?: boolean;
}
