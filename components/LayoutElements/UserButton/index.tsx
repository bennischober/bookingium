"use client";

import classes from "./index.module.css";
import React from "react";
import { useRouter } from "next/navigation";
import {
    UnstyledButton,
    Group,
    Avatar,
    Text
} from "@mantine/core";
import { MdChevronRight } from "react-icons/md";
import { getNameInitials } from "../../../utils/appHandles";
import { UserButtonProps } from "../../../types";

export function UserButton({ image, name, email, color }: UserButtonProps) {
    const router = useRouter();

    const iniitalsFallback = getNameInitials(name);
    if (!color) color = "blue";

    return (
        <UnstyledButton
            className={classes.user}
            onClick={() => router.push("/user/dashboard")}
        >
            <Group>
                <Avatar src={image} alt={name} color={color} radius="xl">
                    {iniitalsFallback}
                </Avatar>

                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500} fz="md">
                        {name}
                    </Text>

                    <Text color="dimmed" size="xs">
                        {email}
                    </Text>
                </div>

                <MdChevronRight size={14} />
            </Group>
        </UnstyledButton>
    );
}