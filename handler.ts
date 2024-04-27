import { connect } from "@/lib/mongodb";
import { Model, Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { BodyValidationError, validateBody } from "./utils/appHandles";

/**
 * A handler function that wraps the actual handler function and ensures database connection and authorization.
 * This middleware pipeline actually does the following:
 * - Connects to the database
 * - Checks if the user is authorized
 * - Calls the actual handler function
 * - Handles errors and returns the appropriate response
 * 
 * To access query parameters, use req.nextUrl.searchParams.get('paramName')!
 * @param method The actual endpoint handler function
 * @returns NextResponse
 */
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
                return NextResponse.json({ success: false, error: `Internal Server Error. ${error}` }, { status: 500 });
            }
        }
    };
}

/**
 * Creates the default GET, PUT, DELETE handlers for a given model.
 * Since every model exposes these basic methods, this function can be used to create the handlers for them.
 * @param model The model to create the handlers for
 * @returns GET, PUT, DELETE handlers
 */
export function createDefaultDynamicHandler<T extends Model<any>>(model: T) {
    return {
        GET: handler<{ id: string }>(async (req, token, context) => {
            const doc = await model.findOne({ _id: context?.params.id, userid: token }).exec();

            if (!doc) {
                return NextResponse.json(
                    { success: false, error: `${model.modelName} not found` },
                    { status: 404 });
            }
            return NextResponse.json({ success: true, data: doc });
        }),

        PUT: handler<{ id: string }>(async (req, token, context) => {
            const body = await validateBody(req);

            const result = await model.updateOne(
                { _id: context?.params.id, userid: token },
                { $set: body.data },
                { runValidators: true, });

            if (!result || result.modifiedCount === 0) {
                return NextResponse.json(
                    { success: false, error: `${model.modelName} not found, unable to update` },
                    { status: 404 });
            }
            return NextResponse.json({ success: true, data: result });
        }),

        DELETE: handler<{ id: string }>(async (req, token, context) => {
            const result = await model.deleteOne({ _id: context?.params.id, userid: token });

            if (!result || result.deletedCount === 0) {
                return NextResponse.json(
                    { success: false, error: `${model.modelName} not found, unable to delete` },
                    { status: 404 });
            }
            return NextResponse.json({ success: true, data: result });
        }),
    };
}

/**
 * Creates the default POST and GET handlers for a given model.
 * @param model The model to create the handlers for
 * @returns GET, POST handlers
 */
export function createDefaultHandler<T extends Model<any>>(model: T) {
    return {
        POST: handler(async (req, token) => {
            const body = await validateBody(req);

            const doc = await model.create(body.data);
            return NextResponse.json({ success: true, data: doc }, { status: 200 });
        }),
        GET: handler(async (req, token) => {
            const data = await model.find({ userid: token }).exec();
            return NextResponse.json({ success: true, data: data }, { status: 200 });
        }),
    }
}
