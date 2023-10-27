"use client";

import React from "react";
import { AppShell } from "@mantine/core";
import { AppContainerProps } from "../../../types";
import { NavbarComponent } from "../Navbar";
import { FooterComponent } from "../Footer";
import { HeaderComponent } from "../Header";

export function AppContainer({children, session}: AppContainerProps) {
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
            }}
            padding="md"
        >
            <AppShell.Header>
                <HeaderComponent session={session}/>
            </AppShell.Header>
            <AppShell.Navbar>
                <NavbarComponent session={session} />
            </AppShell.Navbar>
            <AppShell.Main>{children}</AppShell.Main>
            {/* <FooterComponent /> */}
        </AppShell>
    );
}
