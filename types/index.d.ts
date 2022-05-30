import { MantineNumberSize } from "@mantine/core";
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

export interface BandFormProps {
	handleBands?: (data: {}) => void;
	close?: () => void;
	session: SessionProps["session"];
}

export interface BandEditFormProps {
	session: SessionProps["session"];
	handleBand: (data: {}) => void;
	data: BandFormValues;
}

export interface DealMemoListProps {
	memos: IDealMemo[];
}

export interface DataGridProps {
	columns: any[];
	data: any[];
	title: string;
}

export interface DataGridHeaderProps {
	title: string;
	changeSettings: (settings: DataGridSettingsValues) => void;
}

export interface DataGridSettingsProps {
	opened: boolean;
	onClose: () => void;
	onChangeSettings: (settings: DataGridSettingsValues) => void;
}

export interface ControlledSliderProps {
	marks: {
		value: number;
		label: string;
	}[];
	value: number;
	onChange: (value: number) => void;
	onChangeEnd?: (value: number) => void;
}

/** --- SSR PAGE PROPS --- **/
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
	handleMemos: (data: {}) => void;
	handleBands: (data: {}) => void;
	handleVenues: (data: {}) => void;
	handleLopros: (data: {}) => void;
	handleHotels: (data: {}) => void;
	closeForm: () => void;
}

export interface DealMemoProps {
	session: SessionProps["session"];
	bands: IBand[];
	memos: IDealMemo[];
}

export interface CompleteDealMemoPageProps {
	session: SessionProps["session"];
	memo: IDealMemo;
}

export interface DealEditFormProps {
	handleMemos: (data: {}) => void;
	session: SessionProps["session"];
	data: DealEditFormValues;
	bandName: string;
	created: string;
}

export interface VenueFormProps {
	handleVenue: (data: {}) => void;
	close?: () => void;
	session: SessionProps["session"];
}


/** --- FORM TYPES --- **/

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

export interface ContactInputValues {
	email: string;
	phone: string;
	mobilePhone: string;
	homepage: string;
}

export interface CompanyInputValues extends AddressInputValues, ContactInputValues {
	companyName: string;
	vatNumber: string;
	ustNumber: string;
}

export interface BandFormValues extends CompanyInputValues {
	bandName: string;
	notes: string;
	members: {
		name: string;
		role: string;
		email: string;
		phone: string;
	}[];
}

export interface DealMemoFormValues {
	band: string;
	date: Date;
	deal: string;
	fee: number;
	ticketPriceVVK: number;
	ticketPriceAK: number;
	posters: number;
	status: string;
	notes: string;
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

export interface DealEditFormValues {
	deal: string;
	date: Date;
	fee: number;
	ticketPriceVVK: number;
	ticketPriceAK: number;
	posters: number;
	status: string;
	notes: string;
}

export interface VenueFormValues extends CompanyInputValues {
	venue: string;
	capacity: number;
	notes: string;
}

export interface LoproFormValues extends CompanyInputValues {
	name: string;
	phone: string;
	mobilePhone: string;
	email: string;
	notes: string;
}

export interface HotelFormValues extends CompanyInputValues {
	name: string;
	notes: string;
}

export interface DataGridSettingsValues {
	fontSize: MantineNumberSize;
	verticalSpacing: MantineNumberSize;
	horizontalSpacing: MantineNumberSize;
}


/** --- DATA GRID TYPES --- **/
export interface DealMemoListValues {
	dealId: string;
	band: string;
	deal: string;
	date: string;
	fee: number;
	status: string;
}