import { Document, model, Model, models, Schema } from 'mongoose';
import { IAddress, IDm } from '../modelTypes';
import { ODm } from '../modelObjects';

const personSchema: Schema = new Schema({
    personid: {
        type: String,
        required: true,
        unique: true,
    },
    name: { type: String, required: true },
    notes: { type: String },
    dm: ODm,
});

// for company with many persons: https://www.mongodb.com/community/forums/t/how-to-reference-and-populate-object-embedded-in-another-collection/169052
// https://mongoosejs.com/docs/populate.html#populate_multiple_documents

// also add company schema and model!

// this interface is for other usage in the application
export interface Person {
    firstName: string;
    lastName: string;
    birthday: string;
    tag: "Band" | "Venue" | "Lopro" | "Hotel";
    role?: string;
    notes?: string;
    contact: {
        email: string;
        phone: string;
        mobilePhone: string;
        privatePhone: string;
        otherNumbers: string[];
        homepage: string;
    }
    address: IAddress;
}

// this interface is for mongodb data => document has some extra properties
export interface IPerson extends Document, Person {
    personid: string;
    dm: IDm;
}

export const Person: Model<IPerson> = models.Band || model<IPerson>('Band', personSchema);
