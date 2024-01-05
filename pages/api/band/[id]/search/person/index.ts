import { NextApiRequest, NextApiResponse } from "next";
import { ApiError } from "@/types/errors";
import { IPerson } from "@/models/person";
import { connect } from "@/lib/mongodb";
import { Band } from "@/models/band";
import { isPopulated } from "@/utils/appHandles";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, query, headers: { authorization } } = req;

    await connect();

    if (!authorization) return new ApiError(res).throwSpecific('access_denied');
    if (!query.id) return new ApiError(res, 400, "Missing id").throwSpecific('missing_request_parameters');

    switch (method) {
        case 'GET':
            try {
                // search for the band and filter the members
                const band = await Band.findOne({ _id: query.id }).populate("members").exec();
                if (!band) {
                    return new ApiError(res, 404, `No data found for the id ${query.id}!`).throw();
                }

                const members = isPopulated<IPerson[]>(band.members) ? band.members as IPerson[] : [];
                // check for query.role and filter the members
                if (query.role) {
                    const filteredMembers = members.filter((member) => member.role === query.role);

                    if (filteredMembers.length === 0) {
                        // return first member
                        return res.status(200).json({ success: true, data: members[0] });
                    }

                    // return first filtered member
                    return res.status(200).json({ success: true, data: filteredMembers[0] });
                }

                // else, return all members
                return res.status(200).json({ success: true, data: members });
            } catch (error) {
                return new ApiError(res, 500).handle(error);
            }
        default:
            return new ApiError(res, 405, "HTTP Method Not Allowed").throw();
    }
}
