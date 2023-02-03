import { MantineNumberSize } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/types";
import { Session } from "next-auth";
import { IconBase } from "react-icons/lib";
import { Band, IBand } from "../models/band";
import { ICompany } from "../models/company";
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

export interface ActionButtonProps {
	Icon: typeof IconBase;
	handleOnClick: () => void;
	tooltip?: string;
	buttonColor?: string;
}

interface SearchableProps {
	Form: UseFormReturnType<any>;
	label: string;
	limit?: number;
	placeholder?: string;
	inputProps: string;
	required?: boolean;
	editChild?: React.ReactNode;
	deleteChild?: React.ReactNode;
	buttonChild?: React.ReactNode;
	isIteratable?: boolean; // refers to if its a looped item or just a single item
	isDisabled?: boolean;
}

export interface SearchableInputProps extends SearchableProps {
	autocomplete: any[];
}

interface SearchableIdProxyData {
	display: string;
	value: string;
}

interface SearchableIdProxyProps extends SearchableProps {
	data?: SearchableIdProxyData[];
}

interface IFormEdit {
	Form: UseFormReturnType<any>;
	inputProps: string;
	label?: string;
	placeholder?: string;
	required?: boolean;
}

export interface SearchOrAddProps extends IFormEdit {
	data?: SearchableIdProxyData[];
	buttonLabel: string;
	handleOpen: (state: boolean) => void;
}

// or type to any?
export interface InputComponentProps {
	Form: UseFormReturnType<any>;
}

export interface MemberInputProps extends InputComponentProps {
	isEdit?: boolean;
	persons?: IPerson[];
	inputProps?: string;
	firstFieldLabel?: string;
	secondFieldLabel?: string;
}

export interface AcComponentsInputProps extends InputComponentProps {
	autocomplete: any[];
	label?: string;
	inputProps?: string;
	isEdit?: boolean;
}

export interface CompanyInputProps extends AcComponentsInputProps {
	persons?: IPerson[];
}

export interface LoproInputProps extends InputComponentProps {
	person?: SearchableIdProxyData[];
	company?: SearchableIdProxyData[];
}

export interface BandFormProps {
	handleData: (data: IBand) => void;
	close?: () => void;
	session: SessionProps["session"];
	data?: IBand;
	persons?: IPerson[];
	companies?: ICompany[];
	isEdit?: boolean;
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
	subTitle?: string | JSX.Element;
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

export interface CompanyACPageProps extends ReqAuthProps {
	companies: ICompany[];
}

export interface CompanyPageProps extends ReqAuthProps {
	persons: IPerson[];
}

export interface CompanyEditPageProps extends ReqAuthProps {
	company: ICompany;
	persons: IPerson[];
}

export interface SingleEditPageProps<T> extends ReqAuthProps {
	data: T;
}

export interface BandPageProps extends ReqAuthProps {
	persons: IPerson[];
	companies: ICompany[];
}

export interface DealMemoFormProps {
	session: SessionProps["session"];
	bands: IBand[];
	venues?: IVenue[];
	hotels?: IHotel[];
	persons?: IPerson[];
	companies?: ICompany[];
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
	persons?: IPerson[];
	companies?: ICompany[];
}

export interface CompleteDealMemoPageProps {
	session: SessionProps["session"];
	memo: IDealMemo;
	band?: IBand;
	venue?: IVenue;
	hotel?: IHotel;
	hotels?: IHotel[];
}

export interface SpecificBandPageProps {
	session: SessionProps["session"];
	band: IBand;
	persons: IPerson[];
	companies: ICompany[];
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
	companies?: SearchableIdProxyData[];
	persons?: IPerson[];
	isEdit?: boolean;
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
	persons?: IPerson[];
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
	dealid: string;
	band: string;
	deal: string;
	date: string;
	status: string;
}

export interface BandListValues {
	bandId: string;
	name: string;
	genre: string;
	// website: string;
	// country: string;
}
