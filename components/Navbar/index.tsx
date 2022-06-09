import React, { useState } from "react";
import {
    Navbar,
    ScrollArea,
    createStyles,
    Tooltip,
    UnstyledButton,
    Title,
    Space,
    Code,
} from "@mantine/core";
import { LinksGroup } from "../LinksGroup";
import { getBackgroundColor } from "../../utils/appHandles";
import { UserButton } from "../UserButton";
import { useSession } from "next-auth/react";
import { NavbarProps } from "../../types";
import {
    getNavbarChild,
    getNavbarData,
    getNavbarParent,
} from "../../utils/links";
import { MdHome } from "react-icons/md";
import metadata from "../../metadata.json";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: "flex",
    },

    aside: {
        flex: "0 0 60px",
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRight: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[3]
        }`,
    },

    main: {
        flex: 1,
        backgroundColor:
            theme.colorScheme === "dark"
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
    },

    mainLink: {
        width: 44,
        height: 44,
        borderRadius: theme.radius.md,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[0],
        },
    },

    mainLinkActive: {
        "&, &:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][0],
            color: theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 7
            ],
        },
    },

    title: {
        boxSizing: "border-box",
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: theme.spacing.xl,
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        padding: theme.spacing.md,
        paddingTop: 18,
        height: 60,
        borderBottom: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[3]
        }`,
    },

    logo: {
        boxSizing: "border-box",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        height: 60,
        paddingTop: theme.spacing.md,
        borderBottom: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[7]
                : theme.colors.gray[3]
        }`,
        marginBottom: theme.spacing.xl,
    },

    link: {
        boxSizing: "border-box",
        display: "block",
        textDecoration: "none",
        borderTopRightRadius: theme.radius.md,
        borderBottomRightRadius: theme.radius.md,
        color:
            theme.colorScheme === "dark"
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        padding: `0 ${theme.spacing.md}px`,
        fontSize: theme.fontSizes.sm,
        marginRight: theme.spacing.md,
        fontWeight: 500,
        height: 44,
        lineHeight: "44px",

        "&:hover": {
            backgroundColor:
                theme.colorScheme === "dark"
                    ? theme.colors.dark[5]
                    : theme.colors.gray[1],
            color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
    },

    linkActive: {
        "&, &:hover": {
            borderLeftColor:
                theme.colors[theme.primaryColor][
                    theme.colorScheme === "dark" ? 7 : 5
                ],
            backgroundColor:
                theme.colors[theme.primaryColor][
                    theme.colorScheme === "dark" ? 7 : 5
                ],
            color: theme.white,
        },
    },
}));

export function NavbarComponent(props: NavbarProps) {
    const router = useRouter();

    const { classes, cx } = useStyles();
    const [active, setActive] = useState("Home");
    const [activeLink, setActiveLink] = useState("Home");

    const mainLinks = getNavbarParent().map((link) => (
        <Tooltip
            label={link.label}
            position="right"
            withArrow
            transitionDuration={0}
            key={link.label}
        >
            <UnstyledButton
                onClick={() => setActive(link.label)}
                className={cx(classes.mainLink, {
                    [classes.mainLinkActive]: link.label === active,
                })}
            >
                <link.icon size="24" />
            </UnstyledButton>
        </Tooltip>
    ));

    const childs = getNavbarChild();

    const links = childs[active as keyof typeof childs].map(
        (link: { label: string; link: string }) => (
            <a
                className={cx(classes.link, {
                    [classes.linkActive]: activeLink === link.label,
                })}
                href={link.link}
                onClick={(event) => {
                    event.preventDefault();
                    setActiveLink(link.label);
                    router.push(link.link);
                }}
                key={link.label}
            >
                {link.label}
            </a>
        )
    );

    return (
        <Navbar width={{ sm: 300 }}>
            <Navbar.Section grow className={classes.wrapper}>
                <div className={classes.aside}>
                    <div className={classes.logo}>
                    </div>
                    {mainLinks}
                </div>
                <div className={classes.main}>
                    <Title order={4} className={classes.title}>
                        {active}
                    </Title>
                    {links}
                </div>
            </Navbar.Section>
        </Navbar>
    );
}
