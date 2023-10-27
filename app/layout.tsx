import "../styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";

import React from "react";
import { ColorSchemeScript } from "@mantine/core";
import { auth } from "@/auth";
import { ClientProviders } from "@/components/ClientProviders";

export const metadata = {
    title: "Mantine Next.js template",
    description: "I am using Mantine with Next.js!",
};

export default async function RootLayout({ children }: { children: any }) {
    const session = await auth();
    if (!session) return null;
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
