import { NextApiResponse } from "next";

abstract class AppErrorBase {
    abstract throw(...args: any): void;
    abstract handle(...args: any): void;
}
/**
 * A wrapper for any app errors.
 * @constructor
 * @param {NextApiResponse} res - The response object.
 * @extends AppErrorBase
 */
export class AppErrorHandler extends AppErrorBase {
    private static _instance: AppErrorHandler;
    private _error: AppErrorBase | null;

    constructor() {
        super();

        this._error = null;
    }

    throw(): void {
        if (this._error === null) return;
        this._error.throw();
    }
    handle(): void {
        if (this._error === null) return;
        this._error.handle();
    }

    // setters
    public set error(error: AppErrorBase) {
        this._error = error;
    }
    public SetError(error: AppErrorBase): AppErrorBase {
        this._error = error;
        return AppErrorHandler.Instance;
    }

    // getters
    static get Instance(): AppErrorHandler {
        return this._instance || (this._instance = new this());
    }
}

export type ApiErrorType = "access_denied" | "http_method_not_found" | "unknown_error" | "no_data_found" | "missing_request_parameters" | "data_conflict" | "access_not_authorized";

export class ApiError extends AppErrorBase {
    private _res: NextApiResponse;
    private _status: number;
    private _msg: string;
    private _err: unknown;

    /**
     * An error that is thrown, if any error in the API occurs.
     * @param res - The response object.
     * @param status - The (optional) status code.
     * @param message - The (optional) message to be displayed.
     * @returns {ApiError} The ApiError instance.
     */
    constructor(res: NextApiResponse);
    constructor(res: NextApiResponse, status: number);
    constructor(res: NextApiResponse, status: number, message: string);
    constructor(res: NextApiResponse, status?: number, message?: string) {
        super();

        this._res = res;
        this._status = status ?? 404;
        this._msg = message ?? "Unknown API error occurred!";
    }

    // pre generated errors
    // attach with data?
    public throwSpecific(type: ApiErrorType, msg?: string) {
        switch (type) {
            case "access_denied":
                return this.throw(403, msg ?? "Access denied!");
            case "http_method_not_found":
                return this.throw(400, msg ?? "HTTP Method not found!");
            case "unknown_error":
                return this.throw(500, msg ?? "Unknown error!");
            case "no_data_found":
                return this.throw(404, msg ?? "Data not found!");
            case "missing_request_parameters":
                return this.throw(400, msg ?? "Missing HTTTP request parameters!");
            case "data_conflict":
                return this.throw(409, msg ?? "Data already exists!");
            case "access_not_authorized":
                return this.throw(401, msg ?? "Access not authorized!");
            default:
                return this.throw(500, "Unknown error!");
        }
    }

    // throw function with overloads
    public throw(): void;
    public throw(status: number): void;
    public throw(status: number, message: string): void;
    public throw(status?: number, message?: string): void {
        try {
            throw new Error(message ?? this._msg);
        } catch (err) {
            this.handle(err, this._res, status ?? this._status);
        }
    }

    // handle function with overloads
    /**
     * Handles the error.
     * @param {Error} err - The error to handle. Can be any type.
     * @param {NextApiResponse} res - The (optional) response object.
     * @param {number} status - The (optional) status code.
     * @returns {void}
     */
    public handle(): void;
    public handle(err: unknown): void;
    public handle(err: unknown, res: NextApiResponse): void;
    public handle(err: unknown, res: NextApiResponse, status: number): void;
    public handle(err?: unknown, res?: NextApiResponse, status?: number): void {
        const response = res ?? this._res;
        const error = err ?? this._err;
        const code = status || this._status;

        // handle error
        if (error instanceof Error) {
            return response.status(code).json({ success: false, error: error.message, trace: error.stack });
        }
        if (typeof error === "string") {
            return response.status(code).json({ success: false, error: error });
        }
        return response.status(code).json({ success: false, error: "Unknown error!" });
    }

    // setters
    public set error(error: unknown) {
        this._err = error;
    }
    public SetError(error: unknown): ApiError {
        this._err = error;
        return this;
    }
    public SetCompleteError(error: unknown, res: NextApiResponse, msg: string, status: number): ApiError {
        this._err = error;
        this._res = res;
        this._msg = msg;
        this._status = status;
        return this;
    }

    // getters
}