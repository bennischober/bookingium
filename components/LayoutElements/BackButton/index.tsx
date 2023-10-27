"use client";

import { ActionIcon, Button, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdArrowBackIosNew } from "react-icons/md";

export interface BackButtonProps {
    text?: string;
    useRoute?: boolean;
    useText?: boolean;
}

export function BackButton({ text, useRoute, useText }: BackButtonProps) {
    const router = useRouter();

    const buttonText = text ?? "Go back";

    // supress go back if leaving the app?
    const handleClick = () => {
        if (useRoute) {
            router.back();
            return;
        }

        router.back();
    };

    const hasText = useText ?? true;

    return (
        <>
            {hasText ? (
                <Button
                    leftSection={<MdArrowBack />}
                    variant="default"
                    onClick={() => handleClick()}
                >
                    <Text>{buttonText}</Text>
                </Button>
            ) : (
                <ActionIcon onClick={handleClick} variant="subtle">
                    <MdArrowBackIosNew />
                </ActionIcon>
            )}
        </>
    );
}
