import { Document, model, Model, models, Schema } from 'mongoose';
import { IAddress, IContact, IDm } from '../modelTypes';
import { OAddress, OContact, ODm } from '../modelObjects';

const PersonSchema: Schema = new Schema({
    // closes #148
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: Date, default: null },
    role: { type: String, default: "" },
    notes: { type: String, default: "" },
    contact: OContact,
    address: OAddress,
    ...ODm,
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// Note: If you want to populate bands/companies, make sure the models are already registered!
PersonSchema.virtual('bands', {
    ref: 'Band',
    localField: '_id',
    foreignField: 'members',
});

PersonSchema.virtual('companies', {
    ref: 'Company',
    localField: '_id',
    foreignField: 'members',
});


export interface Person {
    firstName: string;
    lastName: string;
    birthday?: Date;
    role: string;
    notes: string;
    contact: IContact;
    address: IAddress;
}

export interface IPerson extends Document, Person, IDm { }

export const Person: Model<IPerson> = models.Person || model<IPerson>('Person', PersonSchema);
