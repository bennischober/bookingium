import { MantineTheme } from "@mantine/core";
import { NextRouter } from "next/router";
import dayjs from 'dayjs';
import { SessionProps } from "../types";
import axios from "axios";

// handle theme, language, and other app settings

/** --- THEME HANDLE --- **/
export function getBackgroundColor(theme: MantineTheme) {
    return theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0];
}

export function getMenuButtonHover(theme: MantineTheme) {
    return theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[2];
}

/** --- ROUTING HANDLE --- **/
export function getLastRoute(router: NextRouter): string {
    if (Array.isArray(router.query.from)) {
        return router.query.from[router.query.from.length - 1];
    }
    return router.query.from === undefined ? "/" : router.query.from;
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

export function handleSession(router: NextRouter, session: SessionProps["session"], pathname: string, query: { from: string }) {
    if ((session && session.status === "unathorized") || !session) {
        router.push({
            pathname: pathname,
            query
        });
    }
}

/** --- OTHER HANDLE --- **/

export function getCurrentYear() {
    return dayjs().format("YYYY");
}

export function getNameInitials(name: string) {
    return name.split(" ").map(word => word[0]).join("");
}

/** --- DATA STRUCTURE HANDLE --- **/

// function that adds a new item to a specific index of an array and pushes the rest of the array to the end
export function addToArray(array: any[], index: number, item: any) {
    array.splice(index, 0, item);
    return array;
}

/** --- FETCH HANDLE --- **/
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

/** --- DATABASE HANDLE --- **/
export function isPopulated<T>(obj: T | any) : obj is T {
    return (obj && obj.name && typeof obj.name === 'string');
}
