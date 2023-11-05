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
import { usePathname } from "next/navigation";

interface ClientProvidersProps {
    children: React.ReactNode;
    session: Session | null;
}

export function ClientProviders({ children, session = null }: ClientProvidersProps) {
    const pathName = usePathname();

    if (pathName?.includes("/auth/")) {
        return (
            <MantineProvider defaultColorScheme="dark" theme={theme}>
                {children}
            </MantineProvider>
        );
    }

    return (
        <>
            <MantineProvider defaultColorScheme="dark" theme={theme}>
                <Notifications />
                <AppContainer session={session}>{children}</AppContainer>
            </MantineProvider>
        </>
    );
}
