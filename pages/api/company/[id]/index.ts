import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../../lib/mongodb';
import { Company } from "../../../../models/company";
import { ApiError } from '../../../../types/errors';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {
        query: { id, userid },
        method
    } = req;

    await connect();

    if (!id) return new ApiError(res).throwSpecific('missing_request_parameters');
    if (!userid) return new ApiError(res).throwSpecific('access_denied');

    switch (method) {
        case 'GET':
            try {
                const company = await Company.findOne({ _id: id }).exec();
                if (!company) {
                    return new ApiError(res, 404, `No data found for the id ${id}!`).throw();
                }
                return res.status(200).json({ success: true, data: company });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'PUT':
            try {
                const company = await Company.updateOne({ _id: id }, { $set: req.body.data }, { runValidators: true });
                if (!company) {
                    return new ApiError(res).throwSpecific('no_data_found');
                }
                return res.status(200).json({ success: true, data: company });
            }
            catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        case 'DELETE':
            try {
                const company = await Company.deleteOne({ _id: id });
                if (!company) {
                    return new ApiError(res).throwSpecific('no_data_found');
                }
                return res.status(200).json({ success: true, data: {} });
            }
            catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        default:
            return new ApiError(res).throwSpecific('http_method_not_found');
    }
}
