import { MantineNumberSize } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/types";
import { Session } from "next-auth";
import { IconBase } from "react-icons/lib";
import { Band, IBand } from "../models/band";
import { IDealMemo } from "../models/deal-memo";
import { IHotel } from "../models/hotel";
import { IPerson, Person } from "../models/person";
import { IVenue } from "../models/venue";

/** --- COMPONENTS --- **/
export interface PageTemplateProps {
	title: string;
	description?: string;
	content?: string;
	favicon?: string;
	useAuth?: boolean;
	children: React.ReactNode;
}

export interface AppContainerProps {
	children: React.ReactNode;
}

export interface FormContainerProps {
	children: React.ReactNode;
	center?: boolean;
	sx?: {};
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

export interface SearchableProps {
	label: string;
	placeholder?: string;
	data: string[];
	required?: boolean;
	inputProps: string;
	Form: UseFormReturnType<any>;
}


export interface SearchOrAddProps {
	ac: {
		data: string[];
		useForm: UseFormReturnType<any>;
		required?: boolean;
		label: string;
		placeholder: string;
		inputProps: string;
	};
	md: {
		button: string;
		handleOpen: (state: boolean) => void;
	};
}

// or type to any?
export interface InputComponentProps {
	Form: UseFormReturnType;
}

export interface AcComponentsInputProps extends InputComponentProps {
	autocomplete: any[];
	inputProps?: string;
}

export interface LoproInputProps extends InputComponentProps {
	person: any[];
	company: any[];
}

export interface BandFormProps {
	handleData: (data: IBand) => void;
	close?: () => void;
	session: SessionProps["session"];
	data?: IBand;
}

export interface PersonFormProps {
	handleData(data: IPerson): void;
	close?: () => void;
	session: SessionProps["session"];
	data?: IPerson;
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

export interface SpecificPageHeaderProps {
	title: string | JSX.Element;
	titleName: string;
	subTitle?: string;
	other?: React.ReactElement;
	useBackButton?: boolean;
}

/** --- SSR PAGE PROPS --- **/
export interface SessionProps extends Session {
	session: {
		status: string;
		id: string;
		userid: string;
	};
}

export interface ReqAuthProps {
	session: SessionProps["session"];
}

export interface DealMemoFormProps {
	session: SessionProps["session"];
	bands: IBand[];
	venues?: IVenue[];
	hotels?: IHotel[];
	handleMemos: (data: IDealMemo) => void;
	handleBands: (data: IBand) => void;
	handleVenues: (data: IVenue) => void;
	handleHotels: (data: IHotel) => void;
}

export interface DealMemoProps {
	session: SessionProps["session"];
	memos: IDealMemo[];
}

export interface AddDealMemoProps {
	session: SessionProps["session"];
	bands: IBand[];
	memos: IDealMemo[];
	venues?: IVenue[];
	hotels?: IHotel[];
}

export interface CompleteDealMemoPageProps {
	session: SessionProps["session"];
	memo: IDealMemo;
}

export interface SpecificBandPageProps {
	session: SessionProps["session"];
	band: IBand;
}

export interface DealEditFormProps {
	handleMemos: (data: IDealMemo) => void;
	session: SessionProps["session"];
	data: IDealMemo;
	created: string;
}

export interface VenueFormProps {
	handleData: (data: IVenue) => void;
	close?: () => void;
	session: SessionProps["session"];
	data?: IVenue;
}

export interface HotelFormProps {
	handleData: (data: IHotel) => void;
	close?: () => void;
	session: SessionProps["session"];
	data?: IHotel;
}

export interface CompanyFormProps {
	handleData: (data: ICompany) => void;
	close?: () => void;
	session: SessionProps["session"];
	data?: ICompany;
}

/** --- FORM TYPES --- **/
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

export interface BandListValues {
	bandId: string;
	name: string;
	genre: string;
	// website: string;
	// country: string;
}
