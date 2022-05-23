import React from "react";
import {
    createStyles,
    Paper,
    Title,
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

const useStyles = createStyles((theme) => ({
    title: {
        fontSize: 26,
        fontWeight: 900,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },

    controls: {
        [theme.fn.smallerThan("xs")]: {
            flexDirection: "column-reverse",
        },
    },

    control: {
        [theme.fn.smallerThan("xs")]: {
            width: "100%",
            textAlign: "center",
        },
    },
}));

export interface ForgotPasswordProps {
    forgotPassword: () => void;
}

export function ForgotPassword({ forgotPassword }: ForgotPasswordProps) {
    const { classes } = useStyles();

    // ToDo: add forgot password logic; create API endpoint and db queries

    return (
        <Container size={460} my={30}>
            <Text color="dimmed" size="sm" align="center">
                Enter your email to get a reset link
            </Text>

            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
                <TextInput
                    label="Your email"
                    placeholder="me@mantine.dev"
                    required
                />
                <Group position="apart" mt="lg" className={classes.controls}>
                    <Anchor
                        onClick={() => forgotPassword()}
                        color="dimmed"
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