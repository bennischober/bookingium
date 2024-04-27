import { IBand } from "@/models/band";
import { ICompany } from "@/models/company";
import { IDealMemo } from "@/models/deal-memo";
import { IHotel } from "@/models/hotel";
import { IItinerary } from "@/models/itinerary";
import { IPerson } from "@/models/person";
import { IUser } from "@/models/user";
import { IVenue } from "@/models/venue";
import { IWorkplace } from "@/models/workplace";
import { callAPI } from "@/utils/apiHandler";

enum Models {
    Band = 'band',
    Company = 'company',
    DealMemo = 'deal-memo',
    Hotel = 'hotel',
    Itinerary = 'itinerary',
    Person = 'person',
    User = 'user',
    Venue = 'venue',
    Workplace = 'workplace',
}

/**
 * API client for the backend API.
 */
export class ApiClient {
    /**
     * Simplified access to the default API methods for each model.
     * @param model The model to access
     * @returns The default API methods for the given model
     */
    private static baseApi<T>(model: Models, routePrefix: string = "") {
        const modelPath = routePrefix + model;
        return {
            // default root route.ts API methods
            get: (authentication: string, additionalQuery?: Record<string, string>) =>
                callAPI<T[]>(`${modelPath}/`, "GET", null, additionalQuery, authentication),
            post: (authentication: string, body: any, additionalQuery?: Record<string, string>) =>
                callAPI<T>(`${modelPath}/`, "POST", body, additionalQuery, authentication),


            // default dynamic routes in [id]/route.ts
            getById: (authentication: string, id: string, userid: string, additionalQuery?: Record<string, string>) =>
                callAPI<T>(`${modelPath}/${id}`, "GET", null, { userid, ...additionalQuery }, authentication),
            putById: (authentication: string, id: string, body: any, userid: string, additionalQuery?: Record<string, string>) =>
                callAPI<T>(`${modelPath}/${id}`, "PUT", body, { userid, ...additionalQuery }, authentication),
            deleteById: (authentication: string, id: string, userid: string, additionalQuery?: Record<string, string>) =>
                callAPI<T>(`${modelPath}/${id}`, "DELETE", null, { userid, ...additionalQuery }, authentication),
        };
    }

    /**
     * API methods for the Band model
     */
    static Band = {
        ...this.baseApi<IBand>(Models.Band),
        searchPerson: (authentication: string, id: string, role: string, additionalQuery?: Record<string, string>) =>
            callAPI(`/${Models.Band}/${id}/search/person/`, "GET", null, {...additionalQuery, role: role}, authentication),
    }

    /**
     * API methods for the Company model
     */
    static Company = {
        ...this.baseApi<ICompany>(Models.Company),
    }

    /**
     * API methods for the Contract model
     */
    static Contract = {}

    /**
     * API methods for the DealMemo model
     */
    static DealMemo = {
        ...this.baseApi<IDealMemo>(Models.DealMemo),
    }

    /**
     * API methods for the Hotel model
     */
    static Hotel = {
        ...this.baseApi<IHotel>(Models.Hotel),
    }

    /**
     * API methods for the Invoice model
     */
    static Invoice = {}

    /**
     * API methods for the Itinerary model
     */
    static Itinerary = {
        ...this.baseApi<IItinerary>(Models.Itinerary),
        getByMemoId: (authentication: string, memoId: string, additionalQuery?: Record<string, string>) =>
            callAPI<IItinerary>(`/${Models.Itinerary}/memoid/${memoId}`, "GET", null, additionalQuery, authentication),
    }

    /**
     * API methods for the Person model
     */
    static Person = {
        ...this.baseApi<IPerson>(Models.Person),
        search: (authentication: string, additionalQuery: Record<string, string>) =>
            callAPI<IPerson>(`/${Models.Person}/search/`, "GET", null, additionalQuery, authentication),
    }

    /**
     * API methods for the User model
     */
    static User = {
        ...this.baseApi<IUser>(Models.User),
        checkEmail: (authentication: string, email: string, additionalQuery?: Record<string, string>) =>
            callAPI(`/${Models.User}/check-email/`, "GET", null, { ...additionalQuery, email: email }, authentication),
        login: (authentication: string, body: any, additionalQuery?: Record<string, string>) =>
            callAPI(`/${Models.User}/login/`, "POST", body, additionalQuery, authentication),
        register: (authentication: string, body: any, additionalQuery?: Record<string, string>) =>
            callAPI(`/${Models.User}/register/`, "POST", body, additionalQuery, authentication),
    }

    /**
     * API methods for the Venue model
     */
    static Venue = {
        ...this.baseApi<IVenue>(Models.Venue),
    }

    /**
     * API methods for the Workplace model.
     * This is an extension of the User model, since only the user can access their workplaces.
     */
    static Workplace = {
        ...this.baseApi<IWorkplace>(Models.Workplace, `${Models.User}/`),
    }
}
