"use client";

import classes from "./index.module.css";
import Link from "next/link";
import { Container, Title, Text, Space } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import LoginComponent from "../../../components/Auth/Login";
import { ForgotPassword } from "../../../components/Auth/ForgotPassword";

export default function LoginPageComponent() {
    const [isPasswordForgotten, setIsPasswordForgotten] = useToggle([
        false,
        true,
    ]);

    const handlePasswordForgotten = () => {
        setIsPasswordForgotten();
    };

    return (
        <>
            <Container size={420} my={40}>
                <Title ta="center" className={classes.title}>
                    {isPasswordForgotten
                        ? "Forgot your password?"
                        : "Welcome back!"}
                </Title>
                {isPasswordForgotten ? (
                    <ForgotPassword forgotPassword={handlePasswordForgotten} />
                ) : (
                    <LoginComponent forgotPassword={handlePasswordForgotten} />
                )}
                <Space h="xl" />
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Don't want to login? <Link href="/">Back to Home</Link>
                </Text>
            </Container>
        </>
    );
}
