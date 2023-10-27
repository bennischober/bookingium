import React from "react";
import {
    Paper,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
} from "@mantine/core";
import { MdArrowBack } from "react-icons/md";

import classes from "./index.module.css";

export interface ForgotPasswordProps {
    forgotPassword: () => void;
}

export function ForgotPassword({ forgotPassword }: ForgotPasswordProps) {
    // ToDo: add forgot password logic; create API endpoint and db queries

    return (
        <Container size={460} my={30}>
            <Text c="dimmed" size="sm" ta="center">
                Enter your email to get a reset link
            </Text>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                <TextInput
                    label="Your email"
                    placeholder="me@mantine.dev"
                    required
                />
                <Group
                    justify="space-between"
                    mt="lg"
                    className={classes.controls}
                >
                    <Anchor
                        onClick={() => forgotPassword()}
                        c="dimmed"
                        size="sm"
                        className={classes.control}
                    >
                        <Center inline>
                            <MdArrowBack size={12} />
                            <Box ml={5}>Back to login page</Box>
                        </Center>
                    </Anchor>
                    <Button className={classes.control}>Reset password</Button>
                </Group>
            </Paper>
        </Container>
    );
}
