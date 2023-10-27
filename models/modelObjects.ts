import { Types } from 'mongoose';
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

export const OBank = {
    bankName: { type: String, default: '' },
    accountHolder: { type: String, default: '' },
    iban: { type: String, default: '' },
    bic: { type: String, default: '' },
}

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

export const ODm = {
    userid: { type: Types.ObjectId, required: true, index: true },
    created: { type: String, default: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]') },
    edited: { type: String, default: dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]') }
}
