import { NextApiRequest, NextApiResponse } from "next";
import { connect } from '../../../../lib/mongodb';
import DealMemo from '../../../../models/deal-memo';
import Band from "../../../../models/lopro";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { method, body } = req;
}