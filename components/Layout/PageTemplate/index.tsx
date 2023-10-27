import Head from "next/head";
import { useClientCheck, useSessionValidation } from "../../../hooks";
import { PageTemplateProps } from "../../../types";

export function PageTemplate({
    title,
    description,
    content,
    favicon,
    useAuth,
    children,
}: PageTemplateProps) {
    const isClient = useClientCheck();
    const useValidation = useAuth ?? true; // sets default value to true

    const descriptionFallback =
        description ||
        "Mantine is a next-gen platform for managing your projects.";
    const contentFallback = content || "";
    const faviconFallback = favicon || "/favicon.ico";
    const completeTitle = isClient ? title + ` - ${window.location.host}` : title;

    // session could also be passed as parameter to this component
    // session can then be passed to hook => server-side session validation

    // remove client-side validation, because it can lead to errors on server-side api calls!
    //if(useValidation) useSessionValidation();

    return (
        <>
            <Head>
                <title>{completeTitle}</title>
                <meta name={descriptionFallback} content={contentFallback} />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <link rel="icon" href={faviconFallback} />
            </Head>
            {children}
        </>
    );
}
