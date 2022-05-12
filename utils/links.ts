import { MdCreateNewFolder, MdDashboard } from "react-icons/md";
import { RiFileList3Line, RiFileTextLine } from "react-icons/ri";
import {GoFile} from "react-icons/go";


export function getLinks() {
    return {
        "root": "http://localhost:3000",
        "user": {
            "login": "/auth/login",
            "dasboard": "/user/dashboard",
            "profile": "/user/profile",
            "settings": "/user/settings",
        },
        "api": {

        }
    };
}

export function getFooterData() {
    return [
        {
            title: "Row 1",
            links: [
                { label: "link1", link: "https://www.google.com" },
            ],
        },
    ];
}

export function getNavbarData() {
    return [
        { label: "Dashboard", icon: MdDashboard, link: "/" },
        { label: "Invoice", icon: RiFileList3Line, link: "/invoice" },
        { label: "Contract", icon: RiFileTextLine, link: "/contract" },
        { label: "Deal Memo", icon: GoFile, link: "/deal-memo" },
        { label: "Create new", icon: MdCreateNewFolder, links: [
            { label: "Band", link: "/new/band" },
            { label: "Event", link: "/new/event" },
            { label: "Location", link: "/new/location" },
            { label: "Promoter", link: "/new/promoter" },
            { label: "Hotel", link: "/new/hotel" },
        ] },
    ];
}