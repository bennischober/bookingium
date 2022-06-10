import { Navbar, ScrollArea, createStyles } from "@mantine/core";
import { LinksGroup } from "../../LayoutElements/LinksGroup";
import { getBackgroundColor } from "../../../utils/appHandles";
import { UserButton } from "../../LayoutElements/UserButton";
import { useSession } from "next-auth/react";
import { NavbarProps } from "../../../types";
import { getNavbarData } from "../../../utils/links";

const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: getBackgroundColor(theme),
        paddingBottom: 0,
    },

    links: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    },

    footer: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        borderTop: `1px solid ${
            theme.colorScheme === "dark"
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
    },
}));

export function NavbarComponent(props: NavbarProps) {
    const { classes } = useStyles();

    const links = getNavbarData().map((item, index) => {
        return <LinksGroup {...item} key={item.label} />;
    });

    const { data: session, status } = useSession();

    let name = "Not Logged In";
    if (session?.user?.name) {
        name = session.user.name;
    }

    let email = "no@email.com";
    if (session?.user?.email) {
        email = session.user.email;
    }

    return (
        <Navbar
            width={{ sm: 300 }}
            p="md"
            className={classes.navbar}
            hidden={props.hidden}
            style={{ paddingBottom: 0, paddingTop: 0 }}
        >
            <Navbar.Section
                grow
                className={classes.links}
                component={ScrollArea}
            >
                <div className={classes.linksInner}>{links}</div>
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <UserButton name={name} email={email} />
            </Navbar.Section>
        </Navbar>
    );
}
