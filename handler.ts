import { connect } from "@/lib/mongodb";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { BodyValidationError } from "./utils/appHandles";

export function handler<T = undefined>(method: (req: NextRequest, token: string, context?: { params: T }) => Promise<NextResponse>) {
    return async function (req: NextRequest, context?: { params: T }) {
        // Ensure the database is connected
        try {
            await connect();
        } catch (error) {
            // this is ok here, since this will be logged on the server instead of the browser console
            // but in other places, another approach, e.g. sentry, might be better
            console.error('Failed to connect to the database', error);
            return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
        }

        // Check if the user is authorized
        const token = req.headers.get('authorization');
        if (!token || !Types.ObjectId.isValid(token)) {
            console.info('Unauthorized request', token);
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        // Call the actual method
        try {
            return method(req, token, context);
        }
        catch (error) {
            if (error instanceof BodyValidationError) {
                //console.error('Invalid request', error);
                return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
            }
            else {
                //console.error('Failed to process the request', error);
                return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
            }
        }
    };
}
