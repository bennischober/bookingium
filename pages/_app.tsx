import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
    ColorScheme,
    ColorSchemeProvider,
    MantineProvider,
} from "@mantine/core";
import { useEffect, useState } from "react";

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
    const toggleColorScheme = (value?: ColorScheme) => {
        setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
        // setLocalStorageItem(
        //     "theme",
        //     (value as string) || (colorScheme === "dark" ? "light" : "dark")
        // );
    };

    useEffect(() => {
        // create /lib/browserHandles.ts
        // const storedTheme = getLocalStorageItem("theme");
        // if (storedTheme) handleTheme(storedTheme as ColorScheme);
    }, []);

    const handleTheme = (theme: ColorScheme) => {
        setColorScheme(theme);
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

            <ColorSchemeProvider
                colorScheme={colorScheme}
                toggleColorScheme={toggleColorScheme}
            >
                <MantineProvider
                    withGlobalStyles
                    withNormalizeCSS
                    theme={{
                        colorScheme: "dark",
                    }}
                >
                    <Component {...pageProps} />
                </MantineProvider>
            </ColorSchemeProvider>
        </>
    );
}

