import React, { useState } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import { AppContainerProps } from "../../../types";
import { NavbarComponent } from "../Navbar";
import { FooterComponent } from "../Footer";
import { HeaderComponent } from "../Header";

export function AppContainer(props: AppContainerProps) {
    const [opened, setOpened] = useState(false);
    const [navState, setNavState] = useState(true);

    const theme = useMantineTheme();

    const handleNavigation = (opened: boolean) => {
        setOpened(opened);
        // note: needs fallback when changing back to desktop. if mobile closed navbar, desktop navbar is still closed!
        setNavState(!opened);
    };

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 300,
                breakpoint: "sm",
                collapsed: { mobile: !opened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <HeaderComponent
                    handleNavigation={handleNavigation}
                    opened={opened}
                />
            </AppShell.Header>
            <AppShell.Navbar>
                <NavbarComponent hidden={navState} />
            </AppShell.Navbar>
            <AppShell.Main>{props.children}</AppShell.Main>
            {/* <FooterComponent /> */}
        </AppShell>
    );
}
