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

export interface IContact {
    email: string;
    phone: string;
    mobilePhone: string;
    otherNumbers: {
        identifier: string;
        number: string;
    }[];
    homepage: string;
}

export interface IDm {
    userid: string;
    created: string;
    edited: string;
}
