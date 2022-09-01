export interface IAddress {
    street: string;
    streetNumber: string;
    addressSuffix: string;
    zipCode: string;
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

export interface IContactPerson {
    name: string;
    role: string;
    email: string;
    phone: string;
}
// add Person schema!
// add birthday, organization, and address? also encapuslate contact?
export interface IPerson {
    name: string;
    lastname: string;
    email: string;
    phone: string;
    mobilePhone: string;
    role?: string;
    notes?: string;
}
