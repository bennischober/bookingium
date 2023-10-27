import { Document, model, Model, models, Schema, Types } from 'mongoose';
import { IAddress, IBank, IContact, IDm } from '../modelTypes';
import { OAddress, OBank, OContact, ODm } from '../modelObjects';

const WorkplaceSchema: Schema = new Schema({
    name: { type: String, required: true },
    notes: { type: String, default: '' },
    logo: { type: String, default: '' },
    signature: { type: String, default: '' },
    contact: OContact,
    address: OAddress,
    bank: OBank,
    vatNumber: { type: String, default: '' },
    ustNumber: { type: String, default: '' },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    ...ODm,
});

export interface Workplace {
    name: string;
    notes?: string;
    logo: string;
    signature: string;
    contact: IContact;
    address: IAddress;
    bank: IBank;
    vatNumber: string;
    ustNumber: string;
}

export interface IWorkplace extends Document, Workplace, IDm {
    users: Types.ObjectId[];
}

export const Workplace: Model<IWorkplace> = models.Workplace || model<IWorkplace>('Workplace', WorkplaceSchema);
