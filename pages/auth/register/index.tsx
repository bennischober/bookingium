import React, { useState } from "react";
import { Anchor, Title, Text, Container, LoadingOverlay, Space } from "@mantine/core";
import { showNotification, cleanNotifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { PageTemplate } from "../../../components/PageTemplate";
import { RegisterComponent } from "../../../components/Register";
import { RegisterHandleData } from "../../../types";

export default function RegisterPage() {
    const [visible, setVisible] = useState(false);

    const router = useRouter();
    const { data: session } = useSession();
    if (session && session.status === "authorized") {
        router.push("/user/dashboard");
    }
    

    const registerHandler = async (registerData: RegisterHandleData) => {
        // activate loading overlay
        setVisible(true);

        // make user exists check
        try {
            await axios.get("/api/users/register/checkEmail", {
                params: {
                    email: registerData.email,
                },
            });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                if (err.response?.status === 409) {
                    cleanNotifications();
                    showNotification({
                        color: "red",
                        title: "Email already exists",
                        message:
                            "Correct your email or request a new password under login 'forgot password'.",
                        autoClose: 10000,
                    });
                    // disable loading overlay
                    setVisible(false);
                }
            }
            return;
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(registerData.password, salt);

        // change password to hash
        let userData = {
            name: registerData.name,
            email: registerData.email,
            password: hash,
        };

        const res = await axios.post(
            "/api/users/register",
            userData
        );

        if (res.status === 200) {
            signIn("credentials", {
                username: registerData.email,
                password: registerData.password,
            });
            setVisible(false);
        }
    };

    return (
        <PageTemplate title="Register">
            <Container size={420} my={40}>
                <Title
                    align="center"
                    sx={(theme) => ({
                        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                        fontWeight: 900,
                    })}
                >
                    Welcome back!
                </Title>
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Already have an account?{" "}
                    <Link href="/auth/login">
                        <Anchor<"a"> href="/auth/login" size="sm">
                            Login
                        </Anchor>
                    </Link>
                </Text>
                <div style={{ width: 400, position: "relative" }}>
                    <LoadingOverlay visible={visible} />
                    <RegisterComponent registerHandler={registerHandler} />
                </div>
                <Space h="xl" />
                <Text color="dimmed" size="sm" align="center" mt={5}>
                    Don't want to register?{" "}
                    <Link href="/">
                        <Anchor<"a"> size="sm" href="/">
                            Back to Home
                        </Anchor>
                    </Link>
                </Text>
            </Container>
        </PageTemplate>
    );
}