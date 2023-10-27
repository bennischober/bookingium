"use client";

import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Container, Title, Text, Anchor, Alert, Space } from "@mantine/core";
import { useDocumentTitle, useToggle } from "@mantine/hooks";
import { IoAlertCircleOutline } from "react-icons/io5";
import LoginComponent from "../../../components/Auth/Login";
import { ForgotPassword } from "../../../components/Auth/ForgotPassword";
import { SessionProps } from "../../../types";
import { getLastRoute } from "../../../utils/appHandles";
import { PageTemplate } from "../../../components/Layout/PageTemplate";
// import { signIn, signOut } from "../../../auth"

import classes from "./index.module.css";
import { serverLogin } from "./login";

export default function LoginPage() {
    const [isPasswordForgotten, setIsPasswordForgotten] = useToggle([
        false,
        true,
    ]);

    const [pageTitle, setPageTitle] = useState("Login");
    const router = useRouter();

    const handlePasswordForgotten = () => {
        setIsPasswordForgotten();
    };

    const handleLogin = async (
        email: string,
        password: string,
        remember: boolean
    ) => {
        // const result = await serverLogin(email, password);
        // if (result?.status === 200) {
        //     router.push("/");
        // }
    };

    return (
        <>
            {/* <PageTemplate title={"Login"}> */}
                <Container size={420} my={40}>
                    <Title ta="center" className={classes.title}>
                        {isPasswordForgotten
                            ? "Forgot your password?"
                            : "Welcome back!"}
                    </Title>
                    {isPasswordForgotten ? (
                        <ForgotPassword
                            forgotPassword={handlePasswordForgotten}
                        />
                    ) : (
                        <LoginComponent
                            loginHandler={handleLogin}
                            forgotPassword={handlePasswordForgotten}
                        />
                    )}
                    <Space h="xl" />
                    <Text c="dimmed" size="sm" ta="center" mt={5}>
                        Don't want to login? <Link href="/">Back to Home</Link>
                    </Text>
                </Container>
            {/* </PageTemplate> */}
        </>
    );
}
