import { Space, Title } from "@mantine/core";
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

    return(
        <>
                        {useBack ? <BackButton /> : null}
                <Space h="xl" />
                <Title>{titleName}: {title}</Title>
                <Space h="xl" />
                {subTitle ? <Title order={2}>{subTitle}</Title> : null}
                {other}
                <Space h="xl" />
        </>
    );
}
