import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method } = req;

    await connect();

    switch (method) {
        case 'GET':

            break;

        case 'POST':
            break;

        default:
            res.status(400).json({ success: false });
            break;
    }
}