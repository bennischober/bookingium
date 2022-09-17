import { useEffect, useState } from "react";
import axios from "axios";

/**
 * This hook is used to fetch data from any source. It saves the data in the state and updates it, if the data changes.
 * @param url the url to fetch data
 * @param {any=}options config for axios request
 * @returns {{data: T, error: any, loading: boolean}} the data or an empty array, if the data is not fetched yet
 */
export function useDataFetch<T>(
    url: string,
    options?: any
): { data: T; error: any; loading: boolean } {
    // default data might work => test
    const [data, setData] = useState<T>([] as unknown as T);
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url, options);
                console.log(response);
                setData(response.data.data);
            } catch (error: any) {
                setError(error);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [url]);

    return { data, error, loading };
}
