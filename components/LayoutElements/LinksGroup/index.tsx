"use client";

import classes from "./index.module.css";
import React, { useState } from "react";
import {
    Group,
    Box,
    Collapse,
    Text,
    ThemeIcon,
    UnstyledButton,
    rem,
} from "@mantine/core";
import { MdChevronRight } from "react-icons/md";
import Link from "next/link";
import { LinksGroupProps } from "../../../types";

export function LinksGroup({
    icon: Icon,
    label,
    initiallyOpened,
    link,
    links,
}: LinksGroupProps) {
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const items = (hasLinks ? links : []).map((link) => (
        <Text<"a">
            component="a"
            className={classes.link}
            href={link.link}
            key={link.label}
            onClick={(event) => event.preventDefault()}
        >
            {link.label}
        </Text>
    ));

    const component =
        link && link.length > -1 ? (
            <>
                <Link href={link}>
                    <UnstyledButton
                        onClick={() => setOpened((o) => !o)}
                        className={classes.control}
                    >
                        <Box style={{ display: "flex", alignItems: "center" }}>
                            <ThemeIcon variant="light" size={30}>
                                <Icon size={20} />
                            </ThemeIcon>
                            <Box ml="md">{label}</Box>
                        </Box>
                    </UnstyledButton>
                </Link>
            </>
        ) : (
            <>
                <UnstyledButton
                    onClick={() => setOpened((o) => !o)}
                    className={classes.control}
                >
                    <Group justify="space-between" gap={0}>
                        <Box style={{ display: "flex", alignItems: "center" }}>
                            <ThemeIcon variant="light" size={30}>
                                <Icon
                                    style={{ width: rem(18), height: rem(18) }}
                                />
                            </ThemeIcon>
                            <Box ml="md">{label}</Box>
                        </Box>
                        {hasLinks && (
                            <MdChevronRight
                                className={classes.chevron}
                                size={20}
                                style={{
                                    width: rem(16),
                                    height: rem(16),
                                    transform: opened
                                        ? "rotate(90deg)"
                                        : "none",
                                }}
                            />
                        )}
                    </Group>
                </UnstyledButton>
                {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
            </>
        );

    return <>{component}</>;
}
