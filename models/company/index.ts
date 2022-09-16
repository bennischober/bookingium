import { Document, model, Model, models, Schema, Types } from 'mongoose';
import { IAddress, IContact, IDm } from '../modelTypes';
import { OAddress, OContact, ODm } from '../modelObjects';
import { IPerson } from '../person';

const CompanySchema: Schema = new Schema({
    companyid: {
        type: String,
        required: true,
        unique: true,
    },
    name: { type: String, required: true },
    notes: { type: String, default: '' },
    vatNumber: { type: String, default: '' },
    ustNumber: { type: String, default: '' },
    address: OAddress,
    contact: OContact,
    members: [{ type: Schema.Types.ObjectId, ref: 'Person', required: true }],
    dm: ODm,
});

interface _Company {
    name: string;
    notes?: string;
    vatNumber: string;
    ustNumber: string;
    address: IAddress;
    contact: IContact;
}

export interface Company extends _Company {
    members: Types.ObjectId[];
}

// company with populated data
export interface PCompany extends _Company {
    members: IPerson[];
}

export interface ICompany extends Document, Company {
    companyid: string;
    dm: IDm;
}


export const Company: Model<ICompany> = models.Company || model<ICompany>('Company', CompanySchema);
