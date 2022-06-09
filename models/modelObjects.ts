import dayjs from "dayjs";

export const OAddress = {
    street: { type: String },
    streetNumber: { type: String },
    addressSuffix: { type: String },
    zipCode: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    countryCode: { type: String },
};

export const OContact = {
    phone: { type: String },
    mobilePhone: { type: String },
    email: { type: String },
    homepage: { type: String },
};

export const OCompany= {
    name: { type: String },
    vatNumber: { type: String },
    ustNumber: { type: String },
    address: OAddress,
    contact: OContact,
}

export const ODm = {
    userid: { type: String, required: true },
    created: { type: String, default: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]') },
    edited: { type: String }
}