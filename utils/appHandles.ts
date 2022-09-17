import { MantineNumberSize, MantineTheme } from "@mantine/core";
import { NextRouter } from "next/router";
import dayjs from 'dayjs';
import { SessionProps } from "../types";
import axios from "axios";
import { v4 } from "uuid";

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

export function getDynamicRoute(query: string, router: NextRouter): string {
    const r = router.pathname.replace(`[${query}]`, "");
    const q = router.query[query] ?? "";
    if (q === typeof Array) return r + q[q.length - 1]; // use first or last?
    return r + q;
}

export function goToLastRoute(router: NextRouter) {
    router.push(getLastRoute(router));
}

export function changeRoute(router: NextRouter, pathname: string, query: { from?: string }) {
    router.push({
        pathname,
        query
    });
}

// rename this function! => check valid session?
export function handleSession(router: NextRouter, session: SessionProps["session"], toPath: string, query?: { from: string }) {
    if ((session && session.status === "unathorized") || !session) {
        router.push({
            pathname: toPath,
            query
        });
    }
}

/*--- OTHER HANDLE ---*/
export function getCurrentYear() {
    return dayjs().format("YYYY");
}

export function getNameInitials(name: string) {
    return name.split(" ").map(word => word[0]).join("");
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
    if(!obj) return false;
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

export const serverSideFetch = async <T>(url: string, params?: {}) : Promise<T> => {
    const u = url.includes("localhost") ? url : `http://localhost:3000${url}`;
    const fetch = await axios.get(u, {
        params: params,
    });
    if (fetch.status !== 200) return [] as T;
    return fetch.data.data;
}

/* --- DATABASE HANDLE --- */

/**
 * This lets typescript know, that a object is populated. Usually this would only cntain an id, but mongoose populated the id, so it has actual value.
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
export function getValueAtKey<T, K>(data: T[], key: keyof T, value: K): T {
    let item = {} as T;
    data.forEach(element => {
        // kind of a hack, but it works
        if (getProperty(element, key) as unknown as K === value) {
            item = element;
        }
    });
    return item;
}

/**
 * Get a item of data by going through the keys of the data. The keys values will be combined and compared with the given value.
 * @param data Data to search in
 * @param keys keys to search through
 * @param value to compare
 * @returns the item, if it was found
 */
export function getValueAtCombinedKey<T, K>(data: T[], keys: (keyof T)[], value: K, seperator?: string): T {
    const sep = seperator ?? " ";
    let item = {} as T;
    let combined;
    data.forEach(element => {
        combined = keys.map(key => getProperty(element, key) as unknown as K);
        if (combined.join(sep) === value) {
            item = element;
        }
    });
    return item;
}

export function getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
}

export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

export function getFormValueObject<T extends Object>(values: T, userid: string, created?: string, id?: { createId: string, value?: string }) {
    const obj: { [k: string]: any } = {
        dm: {
            edited: dayjs().toISOString(),
            userid: userid,
            created: nonEmptyString(created) ? created : dayjs().toISOString(),
        },
    };

    if (id) {
        obj[id.createId] = id.value ?? v4();
    }

    appendObject<T>(obj, values);
    return obj;
}

export function someUnequal(toTest: any[], toCompare: any) {
    if (toTest.some(element => element === undefined)) return false;

    return toTest.some(item => {
        return item !== toCompare;
    });
}
