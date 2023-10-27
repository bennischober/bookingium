"use client";

import { ScrollArea } from "@mantine/core";
import { LinksGroup } from "../../LayoutElements/LinksGroup";
import { UserButton } from "../../LayoutElements/UserButton";
import { NavbarProps } from "../../../types";
import { getNavbarData } from "../../../utils/links";

import classes from "./index.module.css";

export function NavbarComponent({ session }: NavbarProps) {
    const links = getNavbarData().map((item, index) => {
        return <LinksGroup {...item} key={item.label} />;
    });

    let name = "Not Logged In";
    if (session?.user?.name) {
        name = session.user.name;
    }

    let email = "no@email.com";
    if (session?.user?.email) {
        email = session.user.email;
    }

    return (
        <div className={classes.navbar}>
            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>

            <div className={classes.footer}>
                <UserButton name={name} email={email} />
            </div>
        </div>
    );
}
