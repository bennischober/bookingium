import { useState } from "react";
import axios from "axios";

/**
 * This hook is used to fetch data from any source. It saves the data in the state and updates it, if the data changes.
 * @param url the url to fetch data
 * @param {any=}options config for axios request
 * @returns {Promise<T|undefined>} the data or undefined if the data is not fetched yet
 */
export async function useDataFetch<T>(
    url: string,
    options?: any
): Promise<T | undefined> {
    const [data, setData] = useState<T>();

    // fetch with axios inline
    await axios.get(url, options).then((response) => {
        setData(response.data);
    });

    return data;
}
