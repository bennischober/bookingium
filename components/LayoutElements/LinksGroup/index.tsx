import React, { useState } from "react";
import {
    Group,
    Box,
    Collapse,
    ThemeIcon,
    Text,
    UnstyledButton,
    createStyles,
} from "@mantine/core";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import Link from "next/link";
import {LinksGroupProps} from "../../../types";
import { getMenuButtonHover } from "../../../utils/appHandles";

const useStyles = createStyles((theme) => ({
    control: {
        fontWeight: 500,
        display: "block",
        width: "100%",
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        color:
            theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
        fontSize: theme.fontSizes.sm,

        "&:hover": {
            backgroundColor: getMenuButtonHover(theme),
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
    },

    link: {
        fontWeight: 500,
        display: "block",
        textDecoration: "none",
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        paddingLeft: 31,
        marginLeft: 30,
        fontSize: theme.fontSizes.sm,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        borderLeft: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[7]
                    : theme.colors.gray[0],
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
    },

    chevron: {
        transition: "transform 200ms ease",
    },
}));



export function LinksGroup({
    icon: Icon,
    label,
    initiallyOpened,
    link,
    links,
}: LinksGroupProps) {
    const { classes, theme } = useStyles();
    const hasLinks = Array.isArray(links);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const ChevronIcon = theme.dir === "ltr" ? MdChevronRight : MdChevronLeft;
    const items = (hasLinks ? links : []).map((link) => (
        <Link href={link.link} key={link.label} className={classes.link}>
            {link.label}
        </Link>
    ));

    const component =
        link && link.length > -1 ? (
            <>
                <Link href={link}>
                    <UnstyledButton
                        onClick={() => setOpened((o) => !o)}
                        className={classes.control}
                    >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
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
                    <Group position="apart" spacing={0}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <ThemeIcon variant="light" size={30}>
                                <Icon size={18} />
                            </ThemeIcon>
                            <Box ml="md">{label}</Box>
                        </Box>
                        {hasLinks && (
                            <ChevronIcon
                                className={classes.chevron}
                                size={14}
                                style={{
                                    transform: opened
                                        ? `rotate(${
                                              theme.dir === "rtl" ? -90 : 90
                                          }deg)`
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