import { Paper, Space, Title } from "@mantine/core";
import { BackButton } from "../../LayoutElements/BackButton";
import { SpecificPageHeaderProps } from "../../../types";

export function SpecificPageHeader({
    title,
    titleName,
    subTitle,
    other,
    useBackButton,
}: SpecificPageHeaderProps) {
    const useBack = useBackButton ?? true;

    return (
        <>
            {useBack ? <BackButton /> : null}
            <Space h="xl" />
            <Paper shadow="xs" p="xl" radius="xs">
                <Title>
                    {titleName}: {title}
                </Title>
                <Space h="md" />
                {subTitle ? <Title order={3}>{subTitle}</Title> : null}
                {other ? (
                    <>
                        <Space h="md" />
                        {other}
                    </>
                ) : null}
            </Paper>
            <Space h="xl" />
        </>
    );
}
