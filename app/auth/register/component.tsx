"use client";

import { RegisterHandleData } from "@/types";
import { useState } from "react";
import { Title, Text, Container, LoadingOverlay, Space } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import Link from "next/link";
import bcrypt from "bcryptjs";
import { serverLogin } from "../actions";
import classes from "./page.module.css";
import { RegisterComponent } from "@/components/Auth/Register";

export default function RegisterPageComponent() {
    const [visible, setVisible] = useState(false);

    const handleRegister = async (data: RegisterHandleData) => {
        // activate loading overlay
        setVisible(true);

        // make user exists check
        var emailCheck = await fetch(
            `/api/user/register/checkEmail?email=${data.email}`,
            {
                method: "GET",
            }
        );

        if (emailCheck.status === 409) {
            notifications.show({
                id: "email-exists",
                title: "Email already exists",
                message:
                    "Correct your email or request a new password under login 'forgot password'.",
                color: "red",
                autoClose: 5000,
                withCloseButton: true,
            });
            // disable loading overlay
            setVisible(false);
            return;
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(data.password, salt);

        // change password to hash
        let userData = {
            name: data.name,
            email: data.email,
            password: hash,
        };

        const register = await fetch("/api/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
            cache: "no-cache",
        });

        // placeholder for workplace logic
        if (register.status !== 200 && register.status !== 201) {
            notifications.show({
                id: "register-failed",
                title: "Registration failed",
                message: "Please try again later.",
                color: "red",
                autoClose: 5000,
                withCloseButton: true,
            });
            // disable loading overlay
            setVisible(false);
            return;
        }

        // everything went fine, invoke server function to login
        const successfull = await serverLogin(data.email, data.password);
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
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title}>
                Welcome back!
            </Title>
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Already have an account? <Link href="/auth/login">Login</Link>
            </Text>
            <div style={{ width: 400, position: "relative" }}>
                <LoadingOverlay visible={visible} />
                <RegisterComponent registerHandler={handleRegister} />
            </div>
            <Space h="xl" />
            <Text c="dimmed" size="sm" ta="center" mt={5}>
                Don't want to register? <Link href="/">Back to Home</Link>
            </Text>
        </Container>
    );
}
