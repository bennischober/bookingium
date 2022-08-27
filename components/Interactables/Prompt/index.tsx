import {
    Button,
    Center,
    Group,
    Modal,
    Space,
    Text,
    Title,
} from "@mantine/core";

export interface PromptProps {
    confirmText?: string;
    cancelText?: string;
    onChoose: (state: boolean) => void;
    opened: boolean;
    message?: string;
    title?: string;
}

export function Prompt({
    opened,
    title,
    message,
    onChoose,
    confirmText,
    cancelText,
}: PromptProps) {
    const handleDiscard = () => {
        onChoose(true);
    };

    const handleCancel = () => {
        onChoose(false);
    };

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => handleCancel()}
                withCloseButton={false}
                size="lg"
                radius="md"
            >
                <Center>
                    <Title>{title ?? "Unsaved changes"}</Title>
                </Center>
                <Center>
                    <Text>{message ?? "Are you sure you want to leave this page? Your data will be lost."}</Text>
                </Center>
                <Space h="xl" />
                <Group position="center" grow>
                    <Button onClick={() => handleDiscard()}>
                        {confirmText ?? "Discard"}
                    </Button>
                    <Button onClick={() => handleCancel()} variant="default">
                        {cancelText ?? "Cancel"}
                    </Button>
                </Group>
            </Modal>
        </>
    );
}
