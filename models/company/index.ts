import { Document, model, Model, models, Schema, Types } from 'mongoose';
import { IAddress, IBank, IContact, IDm } from '../modelTypes';
import { OAddress, OBank, OContact, ODm } from '../modelObjects';

const CompanySchema: Schema = new Schema({
    name: { type: String, required: true },
    notes: { type: String, default: '' },
    bank: OBank,
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
    bank: IBank;
    vatNumber: string;
    ustNumber: string;
    address: IAddress;
    contact: IContact;
    members: Types.ObjectId[];
}

export interface ICompany extends Document, Company, IDm { }


export const Company: Model<ICompany> = models.Company || model<ICompany>('Company', CompanySchema);
