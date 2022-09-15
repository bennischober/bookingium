import { Document, model, Model, models, Schema } from 'mongoose';
import { IAddress, IDm } from '../modelTypes';
import { OAddress, OContact, ODm } from '../modelObjects';

const personSchema: Schema = new Schema({
    personid: {
        type: String,
        required: true,
        unique: true,
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: Date },
    tag: {
        type: String,
        required: true,
        enum: ["Band", "Venue", "Lopro", "Hotel"]
    },
    role: { type: String, default: "" },
    notes: { type: String, default: "" },
    contact: OContact,
    address: OAddress,
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
        otherNumbers: {
            identifier: string;
            number: string;
        }[];
        homepage: string;
    }
    address: IAddress;
}

// Person with Metadata => might not be needed => test
export interface MPerson {
    personid: string;
    dm: IDm;
}

// this interface is for mongodb data => document has some extra properties
export interface IPerson extends Document, Person {
    personid: string;
    dm: IDm;
}

export const Person: Model<IPerson> = models.Band || model<IPerson>('Band', personSchema);
