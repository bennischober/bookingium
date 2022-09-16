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
                { label: "Deal Memo List", icon: MdListAlt, link: "/lists/deal-memo" },
                { label: "Band List", icon: MdListAlt, link: "/lists/band" },
            ]
        },
        {
            label: "Add new data", icon: MdPostAdd, links: [
                { label: "Band", link: "/add/band" },
                { label: "Company", link: "/add/compoany" },
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