import { showNotification, updateNotification } from "@mantine/notifications";
import { MdCheck, MdClose } from "react-icons/md";

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

type ApiMethod = "GET" | "POST" | "PUT" | "DELETE";

const getAPIBaseUrl = () => {
    // If window is defined, we are on the client-side
    if (typeof window !== "undefined") {
        return process.env.NEXT_PUBLIC_HOST ?? "";
    }

    // If not, we are on the server-side
    return process.env.HOST ?? "";
};

export async function callAPI<T>(endpoint: string, method?: "GET"): Promise<T>;
export async function callAPI<T>(
    endpoint: string,
    method: "POST" | "PUT",
    body: any
): Promise<T>;
export async function callAPI<T>(
    endpoint: string,
    method: ApiMethod,
    body?: any,
    params?: Record<string, string>
): Promise<T>;
export async function callAPI<T = any>(
    endpoint: string,
    method: ApiMethod = "GET",
    body: any = null,
    params: Record<string, string> = {}
): Promise<T> {
    const baseUrl = getAPIBaseUrl() + "/api/";
    if (endpoint.startsWith("/")) endpoint = endpoint.substring(1);
    const url = new URL(endpoint, baseUrl);

    Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
    );

    const response = await fetch(url.toString(), {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    const responseJson: ApiResponse<T> = await response.json();

    if (responseJson.success) {
        return responseJson.data as T; // Directly return the data if successful
    } else {
        throw new Error(responseJson.error || "Unknown error"); // Throw an error if not successful
    }
}

interface IOptions {
    notificationId: string;
    loadingTitle: string;
    loadingMessage: string;
    successTitle: string;
    successMessage: string;
    errorTitle: string;
    errorMessage: string;
}

export async function withNotification<T>(
    apiCall: () => Promise<T>,
    options?: IOptions,
    method?: ApiMethod
): Promise<T> {
    options = await generateDefaultOptions(options, method);

    // Start by showing the loading notification
    showNotification({
        id: options.notificationId,
        loading: true,
        title: options.loadingTitle,
        message: options.loadingMessage,
        autoClose: false,
        disallowClose: true,
    });

    try {
        const result = await apiCall();

        // If the API call was successful, show the success notification
        updateNotification({
            id: options.notificationId,
            color: "teal",
            title: options.successTitle,
            message: options.successMessage,
            icon: <MdCheck />,
            autoClose: 2000,
        });

        return result;
    } catch (error: any) {
        // If there's an error, show the error notification
        updateNotification({
            id: options.notificationId,
            color: "red",
            title: options.errorTitle,
            message: options.errorMessage,
            icon: <MdClose />,
            autoClose: 2000,
        });
        throw error;
    }
}

async function generateDefaultOptions(options?: IOptions, method?: ApiMethod) : Promise<IOptions> {
    if (options) return options;
    switch (method) {
        case "GET":
            return {
                notificationId: "load-data",
                loadingTitle: "Loading data",
                loadingMessage:
                    "You will be notified whether your data is loaded or any problem occurred",
                successTitle: "Data loaded",
                successMessage: "Your data has been successfully loaded",
                errorTitle: "An error occurred",
                errorMessage: "Your data could not be loaded",
            };
        case "POST":
            return {
                notificationId: "load-data",
                loadingTitle: "Saving your data",
                loadingMessage:
                    "You will be notified whether your data is saved or any problem occurred",
                successTitle: "Data saved",
                successMessage: "Your data has been successfully saved",
                errorTitle: "An error occurred",
                errorMessage: "Your data could not be saved",
            };
        case "PUT":
            return {
                notificationId: "load-data",
                loadingTitle: "Updating your data",
                loadingMessage:
                    "You will be notified whether your data is updated or any problem occurred",
                successTitle: "Data updated",
                successMessage: "Your data has been successfully updated",
                errorTitle: "An error occurred",
                errorMessage: "Your data could not be updated",
            };
        case "DELETE":
            return {
                notificationId: "load-data",
                loadingTitle: "Deleting your data",
                loadingMessage:
                    "You will be notified whether your data is deleted or any problem occurred",
                successTitle: "Data deleted",
                successMessage: "Your data has been successfully deleted",
                errorTitle: "An error occurred",
                errorMessage: "Your data could not be deleted",
            };
        default:
            return {
                notificationId: "load-data",
                loadingTitle: "Loading data",
                loadingMessage:
                    "You will be notified whether your data is loaded or any problem occurred",
                successTitle: "Data loaded",
                successMessage: "Your data has been successfully loaded",
                errorTitle: "An error occurred",
                errorMessage: "Your data could not be loaded",
            }
    }
}
