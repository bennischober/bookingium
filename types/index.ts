/** --- COMPONENTS --- **/

import { Session } from "next-auth";
import { IconBase } from "react-icons/lib";
import { IBand } from "../models/band";
import { IDealMemo } from "../models/deal-memo";

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

export interface LoginComponentProps {
	loginHandler: (username: string, password: string, remember: boolean) => void;
	forgotPassword: () => void;
}

export interface UserButtonProps {
	image?: string;
	name: string;
	email: string;
	color?: string;
}

/** --- OTHER --- **/
export interface SessionProps extends Session {
	session: {
		status: string;
		id: string;
		userid: string;
	};
}

export interface DealMemoProps {
	session: SessionProps["session"];
	payload: IBand[];
}

export interface LoginFormValues {
	email: string;
	password: string;
	remember: boolean;
}
