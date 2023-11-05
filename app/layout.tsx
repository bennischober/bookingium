import "../styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";

import { ColorSchemeScript } from "@mantine/core";
import { auth } from "@/auth";
import { ClientProviders } from "@/components/ClientProviders";
import { getAppName } from "@/utils/appConfig";

export const metadata = {
    title: "Home | " + getAppName(),
    description: "Welcome to " + getAppName() + ", a booking application for the music industry.",
};

export default async function RootLayout({
    children,
}: React.PropsWithChildren) {
    const session = await auth();

    return (
        <html lang="en">
            <head>
                <ColorSchemeScript />
                {/* <link rel="shortcut icon" href="/favicon.svg" /> */}
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
            </head>
            <body>
                <ClientProviders session={session}>{children}</ClientProviders>
            </body>
        </html>
    );
}
