import { MdCreateNewFolder, MdDashboard } from "react-icons/md";
import { RiFileList3Line, RiFileTextLine } from "react-icons/ri";
import { MdListAlt, MdPostAdd, MdHome } from "react-icons/md";

const links = {
    root: "http://localhost:3000",
    auth: {
        login: "/auth/login",
        register: "/auth/register",
    },
    user: {
        dashboard: "/user/dashboard",
        profile: "/user/profile",
        settings: "/user/settings",
    },
    add: {
        band: "/add/band",
        hotel: "/add/hotel",
        lopro: "/add/lopro",
        venue: "/add/venue",
    },
    create: {
        dealMemo: "/create/deal-memo",
        itinerary: "/create/itinerary",
        contract: "/create/contract",
        invoice: "/create/invoice",
    },
    lists: {
        dealMemo: "/deal-memo"
    }
}

export function getLinks() {
    return links;
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

// Refactor all paths!
export function getNavbarData() {
    return [
        { label: "Home", icon: MdHome, link: "/" },
        { label: "Deal Memo", icon: RiFileTextLine, link: "/add/deal-memo" },
        { label: "Contract", icon: RiFileTextLine, link: "/contract" },
        { label: "Itinerary", icon: RiFileTextLine, link: "/itinerary" },
        { label: "Invoice", icon: RiFileList3Line, link: "/invoice" },
        {
            label: "Lists", icon: MdListAlt, links: [
                { label: "Deal Memo List", icon: MdListAlt, link: "/deal-memo" },
            ]
        },
        {
            label: "Create", icon: MdPostAdd, links: [
                { label: "Deal Memo", link: "/add/deal-memo" },
                { label: "Band", link: "/new/band" },
                { label: "Location", link: "/new/location" },
                { label: "Promoter", link: "/new/promoter" },
                { label: "Hotel", link: "/new/hotel" },
            ]
        },
    ];
}

export function getNavbarParent() {
    return [
        { label: "Home", icon: MdHome },
        { label: "Create", icon: MdPostAdd },
        { label: "Add", icon: MdPostAdd },
        { label: "Lists", icon: MdListAlt },
    ];
}

export function getNavbarChild() {
    return (
        {
            Home: [{
                label: "Home",
                link: "/",
            }],
            Create: [{
                label: "Deal Memo",
                link: links.create.dealMemo,
            },
            {
                label: "Contract",
                link: links.create.contract,
            },
            {
                label: "Itinerary",
                link: links.create.itinerary,
            },
            {
                label: "Invoice",
                link: links.create.invoice,
            }],
            Add: [{
                label: "Band",
                link: links.add.band,
            },
            {
                label: "Hotel",
                link: links.add.hotel,
            },
            {
                label: "Venue",
                link: links.add.venue,
            },
            {
                label: "Lopro",
                link: links.add.lopro,
            }],
            Lists: [{
                label: "Deal Memo List",
                link: links.lists.dealMemo,
            }],
        }
    );
}
