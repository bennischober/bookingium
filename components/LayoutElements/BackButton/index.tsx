import { Button, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { MdArrowBack } from "react-icons/md";
import { goToLastRoute } from "../../../utils/appHandles";

export interface BackButtonProps {
    text?: string;
    useRoute?: boolean;
}

export function BackButton({ text, useRoute }: BackButtonProps) {
    const router = useRouter();

    const buttonText = text ?? "Go back";

    const handleClick = () => {
        if (useRoute) {
            goToLastRoute(router);
            return;
        }

        router.back();
    };

    return (
        <Button
            leftIcon={<MdArrowBack />}
            variant="subtle"
            onClick={() => handleClick()}
        >
            <Text>{buttonText}</Text>
        </Button>
    );
}
