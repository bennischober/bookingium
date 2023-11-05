import dayjs from 'dayjs';
import { MantineFontSize } from "@mantine/core";
import { getAPIBaseUrl } from "./apiHandler";

const BASE_URL = "http://localhost:3000";

/*--- OTHER HANDLE ---*/
export function getCurrentYear() {
    return dayjs().format("YYYY");
}

export function getNameInitials(name: string) {
    return name.split(" ").map(word => word[0]).join("");
}

export function clientLog(...args: any[]) {
    if (typeof window !== "undefined") {
        console.log(...args);
    }
}

/*--- DATA STRUCTURE HANDLE ---*/
// function that adds a new item to a specific index of an array and pushes the rest of the array to the end
export function addToArray(array: any[], index: number, item: any) {
    array.splice(index, 0, item);
    return array;
}

export function convertToType<T>(data: any): T {
    return data as T;
}

export function convertMantineSizeToNumber(size: MantineFontSize) {
    return size === "xs" ? 0 : size === "sm" ? 25 : size === "md" ? 50 : size === "lg" ? 75 : size === "xl" ? 100 : 0;
}

export function appendObject<T extends Object>(obj: any, value: T) {
    type ObjectKey = keyof typeof value;

    Object.keys(value).forEach((key) => {
        const k = key as ObjectKey;
        obj[k] = value[k];
    });
    //return obj;
}

export function nonEmptyObj(obj: any) {
    if (!obj) return false;
    return Object.keys(obj).length > 0;
}

export function nonEmptyString(str: any) {
    return str === null || str == undefined ? false : str.length > 0;
}


export const clientSideFetch = async <T>(route: string, params: Record<string, string> = {}): Promise<T> => {
    const url: URL = new URL(route, getAPIBaseUrl());
    Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
    );

    const result = await fetch(url, {
        cache: "no-store"
    });

    if (result.status !== 200) return [] as T;
    const raw = await result.json();
    return raw.data as T;
}

export const serverSideFetch = async<T>(
    route: string,
    params: Record<string, string> = {},
    cacheRule: RequestCache = "no-store",
): Promise<T> => {
    const url: URL = new URL(route, getAPIBaseUrl());
    Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
    );

    const result = await fetch(url, {
        cache: cacheRule
    });

    if (result.status !== 200) return [] as T;
    const raw = await result.json();
    return raw.data as T;
}


/* --- DATABASE HANDLE --- */

/**
 * This lets typescript know, that a object is populated. Usually this would only contain an id, but mongoose populated the id, so it has actual value.
 * 
 * NOTE: Only use this, if the data is really populated. Otherwise it might throw an error!
 * @param obj Object to populate
 * @returns The populated object
 */
export function isPopulated<T>(obj: T | any): obj is T {
    // return (obj && obj.name && typeof obj.name === 'string');
    return obj !== null && obj !== undefined;
}

export function getKeys<T extends Object>(obj: T): (keyof T)[] {
    return Object.keys(obj) as (keyof T)[];
}

/*--- FORM HANDLE ---*/

export function getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

export function getFormValueObject<T extends Object>(values: T, userid: string, created?: string) {
    const obj: { [k: string]: any } = {
        edited: dayjs().toISOString(),
        userid: userid,
        created: nonEmptyString(created) ? created : dayjs().toISOString(),
    };

    appendObject<T>(obj, values);
    return obj;
}

export function someUnequal(toTest: any[], toCompare: any) {
    if (toTest.some(element => element === undefined)) return false;

    return toTest.some(item => {
        return item !== toCompare;
    });
}
