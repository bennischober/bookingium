import { RiFileList3Line, RiFileTextLine } from "react-icons/ri";
import { MdListAlt, MdPostAdd, MdHome } from "react-icons/md";
import { BiImport } from "react-icons/bi";

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

const routeData = {
    "/": {
        title: "Home",
        icon: MdHome,
        link: "/",
    },
    "/deal-memo": {
        title: "Deal Memo",
        icon: RiFileList3Line,
        link: "/deal-memo",
    },
    "/contract": {
        title: "Contract",
        icon: RiFileTextLine,
        link: "/contract",
    },
    "/itinerary": {
        title: "Itinerary",
        icon: RiFileList3Line,
        link: "/itinerary",
    },
    "/invoice": {
        title: "Invoice",
        icon: RiFileList3Line,
        link: "/invoice",
    },
    "/lists/deal-memo": {
        title: "Deal Memo",
        icon: MdListAlt,
        link: "/lists/deal-memo",
    },
    "/lists/band": {
        title: "Band",
        icon: MdListAlt,
        link: "/lists/band",
    },
    "/lists/contract": {
        title: "Contract",
        icon: MdListAlt,
        link: "/lists/contract",
    },
    "/lists/itinerary": {
        title: "Itinerary",
        icon: MdListAlt,
        link: "/lists/itinerary",
    },
    "/lists/invoice": {
        title: "Invoice",
        icon: MdListAlt,
        link: "/lists/invoice",
    },
    "/lists/venue": {
        title: "Venue",
        icon: MdListAlt,
        link: "/lists/venue",
    },
    "/add/band": {
        title: "Band",
        icon: MdPostAdd,
        link: "/add/band",
    },
    "/add/company": {
        title: "Company",
        icon: MdPostAdd,
        link: "/add/company",
    },
    "/add/hotel": {
        title: "Hotel",
        icon: MdPostAdd,
        link: "/add/hotel",
    },
    "/add/venue": {
        title: "Venue",
        icon: MdPostAdd,
        link: "/add/venue",
    },
    "/add/person": {
        title: "Person",
        icon: MdPostAdd,
        link: "/add/person",
    },
    "/import": {
        title: "Import",
        icon: BiImport,
        link: "/import",
    }
}

export const getDataForRoute = (route : string) => {
    const r = route as keyof typeof routeData;
    return routeData[r] ?? {title: "Bookingium"};
}

// Refactor all paths!
export function getNavbarData() {
    return [
        { label: "Home", icon: MdHome, link: "/" },
        { label: "Deal Memo", icon: RiFileTextLine, link: "/deal-memo" },
        { label: "Contract", icon: RiFileTextLine, link: "/contract" },
        { label: "Itinerary", icon: RiFileTextLine, link: "/itinerary" },
        { label: "Invoice", icon: RiFileList3Line, link: "/invoice" },
        {
            label: "Lists", icon: MdListAlt, links: [
                { label: "Deal Memo", icon: MdListAlt, link: "/lists/deal-memo" },
                { label: "Band", icon: MdListAlt, link: "/lists/band" },
            ]
        },
        {
            label: "Add new data", icon: MdPostAdd, links: [
                { label: "Band", link: "/add/band" },
                { label: "Company", link: "/add/company" },
                { label: "Hotel", link: "/add/hotel" },
                { label: "Venue", link: "/add/venue" },
                { label: "Person", link: "/add/person" },
            ]
        },
        {
            label: "Import data", icon: BiImport, link: "/import" // move this to user-dashboard
        }
    ];
}