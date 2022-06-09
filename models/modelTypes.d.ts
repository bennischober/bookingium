export interface IAddress {
    street: string;
    streetNumber: number;
    addressSuffix: string;
    zipCode: number;
    city: string;
    state: string;
    country: string;
    countryCode: string;
}

export interface ICompany {
    name: string;
    vatNumber: string;
    ustNumber: string;
    address: IAddress;
    contact: IContact;
}

export interface IContact {
    phone: string;
    mobilePhone: string;
    email: string;
    homepage: string;
}

export interface IDm {
    userid: string;
    created: string;
    edited: string;
}