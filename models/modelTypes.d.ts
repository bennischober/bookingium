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

export interface IPersonTest {
    name: string;
    lastname: string;
    birthday: string;
    organization: string; //linked to this company; dont save data, only id
    contact: IContact;
    address: IAddress
}

// also split company to collection? google, if this makes sense! => looks like a relational database now...
