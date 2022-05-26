import { UseFormReturnType } from "@mantine/form/lib/use-form";
import { Session } from "next-auth";
import { IconBase } from "react-icons/lib";
import { IBand } from "../models/band";
import { IDealMemo } from "../models/deal-memo";

/** --- COMPONENTS --- **/
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

export interface RegisterComponentProps {
	registerHandler: (registerData: RegisterFormValues) => void;
}

export interface UserButtonProps {
	image?: string;
	name: string;
	email: string;
	color?: string;
}

// or type to any?
export interface InputComponentProps<T> {
	Form: UseFormReturnType<T>;
}

/** --- OTHER --- **/
export interface SessionProps extends Session {
	session: {
		status: string;
		id: string;
		userid: string;
	};
}

export interface DealMemoFormProps {
	session: SessionProps["session"];
	bands: IBand[];
}

export interface DealMemoProps {
	session: SessionProps["session"];
	bands: IBand[];
	memos: IDealMemo[];
}

export interface LoginFormValues {
	email: string;
	password: string;
	remember: boolean;
}

export interface RegisterFormValues {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
	accept: boolean;
}

export interface RegisterHandleData {
	name: string;
	email: string;
	password: string;
	accept: boolean;
}

export interface AddressInputValues {
	streetNumber: number;
	street: string;
	addressSuffix: string;
	zipCode: number;
	city: string;
	state: string;
	country: string;
	countryCode: string;
}

export interface BandFormValues extends AddressInputValues, ContactInputValues {
	bandName: string;
	notes: string;
	companyName: string;
	vatNumber: string;
	ustNumber: string;
	members: {
		name: string;
		role: string;
		email: string;
		phone: string;
	}[];
}

export interface ContactInputValues {
	email: string;
	phone: string;
	mobilePhone: string;
	homepage: string;
}

export interface DealMemoFormValues {
	band: string;
	date: Date;
	deal: string;
	price: Number;
	posters: Number;
	notes: string;
}
