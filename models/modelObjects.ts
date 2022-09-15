import dayjs from "dayjs";

export const OAddress = {
    street: { type: String, default: '' },
    streetNumber: { type: String, default: '' },
    addressSuffix: { type: String, default: '' },
    zipCode: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    country: { type: String, default: '' },
    countryCode: { type: String, default: '' },
};

export const OContact = {
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    mobilePhone: { type: String, default: '' },
    otherNumbers: [{
        identifier: { type: String, default: '' },
        number: { type: String, default: '' },
    }],
    homepage: { type: String, default: '' },
};

export const OCompany = {
    name: { type: String, default: '' },
    vatNumber: { type: String, default: '' },
    ustNumber: { type: String, default: '' },
    address: OAddress,
    contact: OContact,
}

export const ODm = {
    userid: { type: String, required: true },
    created: { type: String, default: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]') },
    edited: { type: String, default: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]') }
}

export const OPerson = {
    name: { type: String, default: '' },
    lastname: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    mobilePhone: { type: String, default: '' },
    role: { type: String, default: '' },
    notes: { type: String, default: '' },
}

export const OContactPerson = {
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    role: { type: String, default: '' },
}
