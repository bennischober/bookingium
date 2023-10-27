import { MantineNumberSize, MantineTheme } from "@mantine/core";
import { NextRouter } from "next/router";
import dayjs from 'dayjs';
import { SessionProps } from "../types";
import axios from "axios";

const BASE_URL = "http://localhost:3000";

// handle theme, language, and other app settings

/*--- THEME HANDLE ---*/
export function getBackgroundColor(theme: MantineTheme) {
    return theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0];
}

export function getMenuButtonHover(theme: MantineTheme) {
    return theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2];
}

/*-- ROUTING HANDLE ---*/
export function getLastRoute(router: NextRouter): string {
    if (Array.isArray(router.query.from)) {
        return router.query.from[router.query.from.length - 1];
    }
    return router.query.from === undefined ? "/" : router.query.from;
}

export function goToLastRoute(router: NextRouter) {
    router.push(getLastRoute(router));
}

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

export function convertMantineSizeToNumber(size: MantineNumberSize) {
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

/*--- FETCH HANDLE ---*/
export const getBands = async (session: SessionProps["session"]) => {
    // get url form links.ts
    const res = await axios.get("http://localhost:3000/api/band", {
        params: {
            userid: session.userid,
        },
    });
    const bands = await res.data.data;
    if (res.status !== 200) return;
    return bands
};

export const getMemos = async (session: SessionProps["session"]) => {
    const res = await axios.get("http://localhost:3000/api/deal-memo", {
        params: {
            userid: session.userid,
        },
    });
    if (res.status !== 200) return;
    const memos = await res.data.data;
    return memos;
};

export const clientSideFetch = async <T>(url: string, params?: {}): Promise<T> => {
    const fetch = await axios.get(url, {
        params: params,
    });
    if (fetch.status !== 200) return [] as T;
    return fetch.data.data;
}

export const serverSideFetch = async <T>(url: string, params?: {}): Promise<T> => {
    const u = url.includes("localhost") ? url : `${BASE_URL}/${url}`;
    const fetch = await axios.get(u, {
        params: params,
    });
    if (fetch.status !== 200) return [] as T;
    return fetch.data.data;
}

export const addData = async <T>(endpoint: string, data: T, userid?: string): Promise<number> => {
    const url = endpoint.includes("localhost") ? endpoint : `${BASE_URL}/${endpoint}`;

    const res = await axios.post(url, data, {
        params: {
            userid: userid,
        },
    });
    return res.status;
}

export const updateData = async <T>(endpoint: string, data: T, userid?: string): Promise<number> => {
    const url = endpoint.includes("localhost") ? endpoint : `${BASE_URL}/${endpoint}`;

    const res = await axios.put(url, { data: data }, {
        params: {
            userid: userid,
        },
    });

    console.log(res.data.data);

    return res.status;
}

export const deleteData = async (endpoint: string, userid?: string): Promise<number> => {
    const url = endpoint.includes("localhost") ? endpoint : `${BASE_URL}/${endpoint}`;

    const res = await axios.delete(url, {
        params: {
            userid: userid,
        },
    });
    return res.status;
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
