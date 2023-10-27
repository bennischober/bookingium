import "../styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { AppContainer } from "../components/Layout/AppContainer";
import { theme } from "../theme";
import { Notifications } from "@mantine/notifications";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";

export default function App({
    Component,
    pageProps: { session, ...pageProps },
    ...appPropps
}: AppProps<{ session: Session }>) {
    const specialPage: string[] = [
        "/auth/login",
        "/auth/register",
        "/404",
        "/500",
    ];
    const getPageContent = () => {
        return specialPage.includes(appPropps.router.pathname) ? (
            <Component {...pageProps} />
        ) : (
            <AppContainer>
                <Component {...pageProps} />
            </AppContainer>
        );
    };

    return (
        <>
            <MantineProvider theme={theme}>
                <Head>
                    <title>Page title</title>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
                </Head>

                <SessionProvider
                    session={session}
                    refetchInterval={0}
                >
                    <Notifications />
                    {getPageContent()}
                </SessionProvider>
            </MantineProvider>
        </>
    );
}
