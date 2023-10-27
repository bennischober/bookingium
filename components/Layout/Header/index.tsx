import React from "react";
import {
    ActionIcon,
    Burger,
    useMantineColorScheme,
    useMantineTheme,
    Tooltip,
    Group,
    Code,
    Title,
} from "@mantine/core";
import {
    MdOutlineDarkMode,
    MdOutlineLightMode,
    MdLogin,
    MdLogout,
    MdOutlineSettings,
} from "react-icons/md";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import metadata from "../../../metadata.json";
import { HeaderProps } from "../../../types";
import { BackButton } from "../../LayoutElements/BackButton";
import { getDataForRoute } from "../../../utils/links";

import classes from "./index.module.css";
import { useMediaQuery } from "@mantine/hooks";

export function HeaderComponent({ handleNavigation, opened }: HeaderProps) {
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const matches = useMediaQuery("(min-width: 36em)", true, {
        getInitialValueInEffect: false,
    });
    const visible = matches ? "none" : "block";

    const router = useRouter();

    const { data: session, status } = useSession();

    const handleSession = () => {
        if (session && status && status === "authenticated") {
            handleLogOut();
            return;
        }
        handleLogin();
    };

    const handleLogOut = () => {
        signOut();
    };

    const handleLogin = () => {
        router.push("/auth/login");
    };

    const title = getDataForRoute(router.pathname).title;

    return (
        <header className={classes.header}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                }}
            >
                <div style={{ display: visible }}>
                    <Burger
                        opened={opened}
                        onClick={() => handleNavigation(!opened)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                    />
                </div>
                <div className={classes.container}>
                    <Group>
                        <BackButton useText={false} />
                        <Title order={3}>{title}</Title>
                        <Group justify="space-between">
                            <Code style={{ fontWeight: 700 }}>
                                v{metadata.buildMajor}.{metadata.buildMinor}.
                                {metadata.buildRevision}-{metadata.buildTag}
                            </Code>
                        </Group>
                    </Group>

                    <Group gap="xs">
                        <Tooltip
                            label={
                                colorScheme === "dark"
                                    ? "Light Mode"
                                    : "Dark Mode"
                            }
                            openDelay={500}
                        >
                            <ActionIcon
                                variant="default"
                                onClick={() => toggleColorScheme()}
                                size={34}
                                radius="md"
                            >
                                {colorScheme === "dark" ? (
                                    <MdOutlineLightMode size={22} />
                                ) : (
                                    <MdOutlineDarkMode size={22} />
                                )}
                            </ActionIcon>
                        </Tooltip>
                        {session && status && status === "authenticated" ? (
                            <Tooltip label="Settings" openDelay={500}>
                                <ActionIcon
                                    variant="default"
                                    onClick={() =>
                                        router.push("/user/settings")
                                    }
                                    size={34}
                                    radius="md"
                                >
                                    <MdOutlineSettings size={22} />
                                </ActionIcon>
                            </Tooltip>
                        ) : (
                            <></>
                        )}
                        <Tooltip
                            label={session ? "Logout" : "Login"}
                            openDelay={500}
                        >
                            <ActionIcon
                                variant="default"
                                size={34}
                                radius="md"
                                onClick={() => handleSession()}
                            >
                                {session ? (
                                    <MdLogout size={22} />
                                ) : (
                                    <MdLogin size={22} />
                                )}
                            </ActionIcon>
                        </Tooltip>
                    </Group>
                </div>
            </div>
        </header>
    );
}
