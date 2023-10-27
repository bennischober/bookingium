"use client";

import "../../styles/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";

import { Session } from "next-auth";
import { AppContainer } from "../Layout/AppContainer";
import { Notifications } from "@mantine/notifications";
import { theme } from "@/theme";
import { MantineProvider } from "@mantine/core";

export interface ClientProvidersProps {
    children: React.ReactNode;
    session: Session;
}

export function ClientProviders({ children, session }: ClientProvidersProps) {
    return (
        <>
            <MantineProvider defaultColorScheme="dark" theme={theme}>
                <Notifications />
                <AppContainer session={session}>{children}</AppContainer>
            </MantineProvider>
        </>
    );
}
