import useSWRInfinite from 'swr/infinite';

export default function UseInfinitePagination(url) {
    const getKey = (pageIndex, previousPageData) => {
        if (previousPageData && !previousPageData.length) return null; // reached the end
        return `${url}?page=${pageIndex}&per_page=35`; // SWR key
    };
    const fetcher = (url) => fetch(url).then((res) => res.json());

    const { data, size, setSize, error } = useSWRInfinite(getKey, fetcher);
    if (!data) return 'loading';
    return {
        data,
        size,
        setSize,
        error,
    };
}
