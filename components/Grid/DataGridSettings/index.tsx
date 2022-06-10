import {
    Button,
    Drawer,
    MantineNumberSize,
    Space,
    Text,
    Title,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { DataGridSettingsProps } from "../../../types";
import {
    convertMantineSizeToNumber,
    convertToType,
} from "../../../utils/appHandles";
import { getDataGridSettings } from "../../../utils/browserHandle";
import { ControlledSlider } from "../../FormElements/ControlledSlider";

const MARKS = [
    { value: 0, label: "xs" },
    { value: 25, label: "sm" },
    { value: 50, label: "md" },
    { value: 75, label: "lg" },
    { value: 100, label: "xl" },
];

export function DataGridSettings({
    opened,
    onClose,
    onChangeSettings,
}: DataGridSettingsProps) {
    const [fontValue, setFontValue] = useState(
        convertMantineSizeToNumber(getDataGridSettings().fontSize)
    );
    const [horizontalValue, setHorizontalValue] = useState(
        convertMantineSizeToNumber(getDataGridSettings().horizontalSpacing)
    );
    const [verticalValue, setVerticalValue] = useState(
        convertMantineSizeToNumber(getDataGridSettings().verticalSpacing)
    );

    const handleClose = () => {
        onClose();
    };

    const handleSettingsChange = () => {
        onChangeSettings({
            fontSize: convertToType<MantineNumberSize>(
                MARKS.find((mark) => mark.value === fontValue)!.label
            ),
            horizontalSpacing: convertToType<MantineNumberSize>(
                MARKS.find((mark) => mark.value === horizontalValue)?.label
            ),
            verticalSpacing: convertToType<MantineNumberSize>(
                MARKS.find((mark) => mark.value === verticalValue)?.label
            ),
        });
    };

    // setState is async, so update settings with useEffect
    useEffect(() => {
        handleSettingsChange();
    }, [fontValue, horizontalValue, verticalValue]);

    const handleReset = () => {
        setFontValue(25);
        setHorizontalValue(25);
        setVerticalValue(25);
    };

    return (
        <Drawer
            opened={opened}
            onClose={() => handleClose()}
            title="Data Grid Settings"
            size="xl"
            padding="xl"
        >
            <Title order={4}>Spacing</Title>
            <Space h="xl" />
            <ControlledSlider
                value={fontValue}
                marks={MARKS}
                onChange={setFontValue}
            />
            <Text>Change Font Size</Text>
            <Space h="xl" />
            <ControlledSlider
                value={horizontalValue}
                marks={MARKS}
                onChange={setHorizontalValue}
            />
            <Text>Change Vertical Spacing</Text>
            <Space h="xl" />
            <ControlledSlider
                value={verticalValue}
                marks={MARKS}
                onChange={setVerticalValue}
            />
            <Text>Change Horizontal Spacing</Text>
            <Space h="xl" />
            <Button onClick={() => handleReset()}>Reset</Button>
        </Drawer>
    );
}
