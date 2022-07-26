import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../lib/mongodb';
import DealMemo from '../../../models/deal-memo';
import { ApiError } from '../../../types/errors';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query: { userid } } = req;

    await connect();

    switch (method) {
        case 'GET':
            if (!userid) return new ApiError(res).throwSpecific('access_denied');
            try {
                // register schema/model if its not already registered
                require('../../../models/band');

                // send populated data => needed in deal memo list
                const dt = await DealMemo.find({ 'dm.userid': userid }).populate('bandid').exec();
                return res.status(200).json({ success: true, data: dt });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'POST':
            try {
                const dealMemo = await DealMemo.create(req.body.data); // create new db entry
                return res.status(200).json({ success: true, data: dealMemo });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        default:
            return new ApiError(res).throwSpecific('http_method_not_found');
    }
}
