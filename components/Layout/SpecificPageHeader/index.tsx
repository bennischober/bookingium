import { Paper, Space, Title } from "@mantine/core";
import { SpecificPageHeaderProps } from "../../../types";

export function SpecificPageHeader({
    title,
    titleName,
    subTitle,
    other,
}: SpecificPageHeaderProps) {
    return (
        <>
            <Paper shadow="xs" p="xl" radius="sm" withBorder>
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
            <Space h="md" />
        </>
    );
}
