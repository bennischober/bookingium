import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useEffect, useState } from "react";
import {
    getLocalStorageItem,
    setLocalStorageItem,
} from "../utils/browserHandle";
import { AppContainer } from "../components/Layout/AppContainer";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps, ...appPropps }: AppProps) {
    const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
    const toggleColorScheme = (value?: ColorScheme) => {
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
        setLocalStorageItem(
            "theme",
            (value as string) || (colorScheme === "dark" ? "light" : "dark")
        );
    };

    useEffect(() => {
        const storedTheme = getLocalStorageItem("theme");
        if (storedTheme) handleTheme(storedTheme as ColorScheme);
    }, []);

    const handleTheme = (theme: ColorScheme) => {
        setColorScheme(theme);
    };

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
            <Head>
                <title>Page title</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>

            <SessionProvider session={pageProps.session} refetchInterval={0}>
                <ColorSchemeProvider
                    colorScheme={colorScheme}
                    toggleColorScheme={toggleColorScheme}
                >
                    <MantineProvider
                        withGlobalStyles
                        withNormalizeCSS
                        theme={{
                            colorScheme: colorScheme,
                        }}
                    >
                        <NotificationsProvider>
                            {getPageContent()}
                        </NotificationsProvider>
                    </MantineProvider>
                </ColorSchemeProvider>
            </SessionProvider>
        </>
    );
}

