interface PaginatonResult<T> {
    data: T[];
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalpages:number;
}


export const paginate = async(items: string[],currentPage:number) => {
    const pageSize = 5;
    const totalItems = items.length;
    const totalpages = Math.ceil(totalItems/pageSize);
    const StartIndex = (currentPage -1) * pageSize;
    const endIndex = StartIndex + pageSize;
    const paginatedItems = items.slice(StartIndex, endIndex);

    return {
        data: paginatedItems,
        currentPage,
        pageSize,
        totalItems,
        totalpages
    };
}