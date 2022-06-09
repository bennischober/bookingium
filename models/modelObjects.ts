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
