"use client";

import React from "react";
import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Text,
    Group,
    Button,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { MdAlternateEmail } from "react-icons/md";
import { LoginComponentProps, LoginFormValues } from "../../../types";
import Link from "next/link";
import { serverLogin } from "@/app/auth/actions";
import { z } from "zod";
import { notifications } from "@mantine/notifications";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export default function LoginComponent({
    forgotPassword,
}: LoginComponentProps) {
    const form = useForm<LoginFormValues>({
        validateInputOnBlur: true,
        initialValues: {
            email: "",
            password: "",
            remember: false,
        },
        validate: zodResolver(schema),
    });

    // Rember me checkbox
    // https://github.com/nextauthjs/next-auth/issues/974

    const handleSubmit = async (values: LoginFormValues) => {
        const successfull = await serverLogin(values.email, values.password);
        if (successfull === false) {
            notifications.show({
                id: "login-failed",
                title: "Login failed",
                message: "Please check your credentials",
                color: "red",
                autoClose: 5000,
                withCloseButton: true,
            });
        }
    };

    return (
        <>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{" "}
                <Link href="/auth/register">Create account</Link>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form
                    onSubmit={form.onSubmit((values) => handleSubmit(values))}
                >
                    <TextInput
                        label="Email"
                        placeholder="email@domain.com"
                        withAsterisk
                        rightSection={<MdAlternateEmail />}
                        {...form.getInputProps("email")}
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        mt="md"
                        withAsterisk
                        {...form.getInputProps("password")}
                    />
                    <Group justify="space-between" mt="md">
                        <Checkbox
                            label="Remember me"
                            {...form.getInputProps("remember", {
                                type: "checkbox",
                            })}
                        />
                        <Anchor<"a"> onClick={() => forgotPassword()} size="sm">
                            Forgot password?
                        </Anchor>
                    </Group>
                    <Button type="submit" fullWidth mt="xl">
                        Sign in
                    </Button>
                </form>
            </Paper>
        </>
    );
}
