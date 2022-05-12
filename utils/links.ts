import { MdChecklist, MdCreateNewFolder, MdDashboard, MdMovie, MdOutlineChangeCircle, MdPictureAsPdf } from "react-icons/md";
import { RiNumbersFill } from "react-icons/ri";
import { SiPlotly } from "react-icons/si";


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
        {
            label: "Calculators",
            icon: RiNumbersFill,
            links: [
                { label: "PX to REM", link: "/calculators/pxtorem" },
                { label: "Aspect Ratio", link: "/calculators/aspect-ratio" },
                { label: "SSQ", link: "/" },
                { label: "SUS", link: "/" },
                { label: "Bootstrapping", link: "/" },
            ],
        },
        {
            label: "Converters",
            icon: MdOutlineChangeCircle,
            links: [
                { label: "JSON to Any", link: "/converters/json-to-any" },
                { label: "Any to JSON", link: "/converters/any-to-json" },
                { label: "Any to Any", link: "/converters/any-to-any" },
            ],
        },
        {
            label: "Generators",
            icon: MdCreateNewFolder,
            links: [
                { label: "UUID", link: "/generators/uuid" },
                { label: "Mock Data", link: "/generators/mock-data" },
            ]
        },
        {
            label: "PDF Utilities",
            icon: MdPictureAsPdf,
            links: [
                { label: "PDF to Image", link: "/pdf/pdf-to-image" },
                { label: "Image to PDF", link: "/pdf/image-to-pdf" },
                { label: "Create PDF", link: "/pdf/create-pdf" },
                { label: "Merge PDFs", link: "/pdf/merge-pdf" },
                { label: "Split PDF", link: "/pdf/split-pdf" },
            ],
        },
        {
            label: "Plotting",
            icon: SiPlotly,
            link: "/plotting",
        },
        {
            label: "ToDo",
            icon: MdChecklist,
            link: "/todo",
        },
        {
            label: "Movies",
            icon: MdMovie,
            links: [{ label: "Dashboard", link: "movies/dashboard" }],
        },
    ];
}