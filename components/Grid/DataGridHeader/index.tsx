import { ActionIcon, Group, Space, Title, Tooltip } from "@mantine/core";
import { useState } from "react";
import { MdOutlineSettings } from "react-icons/md";
import { DataGridHeaderProps, DataGridSettingsValues } from "../../../types";
import { DataGridSettings } from "../DataGridSettings";

export function DataGridHeader({ title, changeSettings }: DataGridHeaderProps) {
    const [settingsOpened, setSettingsOpened] = useState(false);

    const onCloseSettings = () => {
        setSettingsOpened(false);
    };

    const onChangeSettings = (settings: DataGridSettingsValues) => {
        changeSettings(settings);
    };

    return (
        <>
            <Group grow position="apart">
                <Title order={1}>{title}</Title>
                <>
                    <Tooltip
                        label="Settings"
                        openDelay={500}
                        style={{ alignSelf: "flex-end" }}
                    >
                        <ActionIcon
                            variant="default"
                            onClick={() => setSettingsOpened(true)}
                            size={34}
                            radius="md"
                        >
                            <MdOutlineSettings size={22} />
                        </ActionIcon>
                    </Tooltip>
                </>
            </Group>
            <Space h="xl" />
            <DataGridSettings
                opened={settingsOpened}
                onClose={onCloseSettings}
                onChangeSettings={onChangeSettings}
            />
        </>
    );
}
