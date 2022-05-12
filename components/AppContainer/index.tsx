import React, { useState } from "react";
import { AppShell, useMantineTheme } from "@mantine/core";
import { AppContainerProps } from "../../types";
import { getBackgroundColor } from "../../utils/appHandles";
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
            styles={{
                main: {
                    background: getBackgroundColor(theme),
                },
            }}
            navbarOffsetBreakpoint="sm"
            asideOffsetBreakpoint="sm"
            fixed
            navbar={<NavbarComponent hidden={navState} />}
            header={
                <HeaderComponent
                    handleNavigation={handleNavigation}
                    opened={opened}
                />
            }
        >
            {props.children}
            <FooterComponent />
        </AppShell>
    );
}
