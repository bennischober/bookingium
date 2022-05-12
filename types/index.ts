/** --- COMPONENTS --- **/

import { IconBase } from "react-icons/lib";

export interface PageTemplateProps {
	title: string;
	description?: string;
	content?: string;
	favicon?: string;
	children: React.ReactNode;
}

export interface AppContainerProps {
	children: React.ReactNode;
}

export interface HeaderProps {
	handleNavigation: (opened: boolean) => void;
	opened: boolean;
}

export interface NavbarProps {
	hidden?: boolean;
}

export interface LinksGroupProps {
	icon: typeof IconBase;
	label: string;
	initiallyOpened?: boolean;
	link?: string;
	links?: { label: string; link: string }[];
}

export interface UserButtonProps {
	image?: string;
	name: string;
	email: string;
	color?: string;
}