"use client";

import classes from "./index.module.css";
import React from "react";
import {
    ActionIcon,
    useMantineColorScheme,
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
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import metadata from "../../../metadata.json";
import { BackButton } from "../../LayoutElements/BackButton";
import { getDataForRoute } from "../../../utils/links";
import { Session } from "next-auth";

interface HeaderProps {
    session: Session | null;
}

export function HeaderComponent({session}: HeaderProps) {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const router = useRouter();
    const path = usePathname();
    if(!path) return<></>;

    const handleSession = () => {
        if (session && session.status && session.status === "authorized") {
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

    const title = getDataForRoute(path).title;

    return (
        <div className={classes.header}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                }}
            >
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
                        {session && session.status && session.status === "authorized" ? (
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
        </div>
    );
}
