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
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{" "}
                <Link href="/auth/register">
                    <Anchor<"a"> href="/auth/register" size="sm">
                        Create account
                    </Anchor>
                </Link>
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <form
                    onSubmit={form.onSubmit((values) =>
                        loginHandler(
                            values.email,
                            values.password,
                            values.remember
                        )
                    )}
                >
                    <TextInput
                        label="Email"
                        placeholder="email@domain.com"
                        icon={<MdAlternateEmail />}
                        id="mantine-tzcdl80cn"
                        {...form.getInputProps("email")}
                        required
                    />
                    <PasswordInput
                        label="Password"
                        placeholder="Your password"
                        icon={<MdLockOutline />}
                        mt="md"
                        id="mantine-t51ia2aie"
                        {...form.getInputProps("password")}
                        required
                    />
                    <Group position="apart" mt="md">
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