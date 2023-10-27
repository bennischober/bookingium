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
import { useForm } from "@mantine/form";
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { LoginComponentProps, LoginFormValues } from "../../../types";
import Link from "next/link";
import { serverLogin } from "@/app/auth/login/login";

export default function LoginComponent({
    loginHandler,
    forgotPassword,
}: LoginComponentProps) {
    const form = useForm<LoginFormValues>({
        initialValues: {
            email: "",
            password: "",
            remember: false,
        },
        validate: (values: LoginFormValues) => ({
            email: /^\S+@\S+$/.test(values.email) ? null : "Invalid email",
            password:
                values.password.length >= 6
                    ? null
                    : "Password must be at least 6 characters",
        }),
    });

    // Rember me checkbox
    // https://github.com/nextauthjs/next-auth/issues/974

    return (
        <>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Do not have an account yet?{" "}
                <Link href="/auth/register">
                        Create account
                </Link>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form action={(val) => {
                    console.log(form.values);
                    if(!form.values) return;
                    serverLogin(form.values.email, form.values.password);
                }}
                >
                    <TextInput
                        label="Email"
                        placeholder="email@domain.com"
                        rightSection={<MdAlternateEmail />}
                        id="mantine-tzcdl80cn"
                        {...form.getInputProps("email")}
                        required
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        rightSection={<MdLockOutline />}
                        mt="md"
                        id="mantine-t51ia2aie"
                        {...form.getInputProps("password")}
                        required
                    />
                    <Group justify="space-between" mt="md">
                        <Checkbox
                            label="Remember me"
                            id="mantine-00vo2p68i"
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