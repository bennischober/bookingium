import { ActionIcon, Button, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { MdArrowBack, MdArrowBackIosNew } from "react-icons/md";
import { goToLastRoute } from "../../../utils/appHandles";

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
            goToLastRoute(router);
            return;
        }

        router.back();
    };

    const hasText = useText ?? true;

    return (
        <>
            {hasText ? (
                <Button
                    leftIcon={<MdArrowBack />}
                    variant="subtle"
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
