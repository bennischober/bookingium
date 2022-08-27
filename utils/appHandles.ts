import { MantineNumberSize, MantineTheme } from "@mantine/core";
import { NextRouter } from "next/router";
import dayjs from 'dayjs';
import { SessionProps } from "../types";
import axios from "axios";

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

export const serverSideFetch = async (url: string, params?: {}) => {
    const u = url.includes("localhost") ? url : `http://localhost:3000${url}`;
    const fetch = await axios.get(u, {
        params: params,
    });
    if (fetch.status !== 200) return [];
    return fetch.data.data;
}

/** --- DATABASE HANDLE --- **/
export function isPopulated<T>(obj: T | any): obj is T {
    // return (obj && obj.name && typeof obj.name === 'string');
    return obj !== null && obj !== undefined;
}

export function getKeys<T>(obj: T): (keyof T)[] {
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

export function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}
