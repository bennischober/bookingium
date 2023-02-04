import { Document, model, Model, models, Schema, Types } from 'mongoose';
import { IAddress, IContact, IDm } from '../modelTypes';
import { OAddress, OContact, ODm } from '../modelObjects';

const CompanySchema: Schema = new Schema({
    name: { type: String, required: true },
    notes: { type: String, default: '' },
    vatNumber: { type: String, default: '' },
    ustNumber: { type: String, default: '' },
    address: OAddress,
    contact: OContact,
    members: [{ type: Schema.Types.ObjectId, ref: 'Person', required: true }],
    ...ODm,
});

export interface Company {
    name: string;
    notes?: string;
    vatNumber: string;
    ustNumber: string;
    address: IAddress;
    contact: IContact;
    members: Types.ObjectId[];
}

export interface ICompany extends Document, Company, IDm { }


export const Company: Model<ICompany> = models.Company || model<ICompany>('Company', CompanySchema);
