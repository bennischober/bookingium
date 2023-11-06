"use client";

import { useRef } from "react";
import { ActionIcon, rem } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { MdOutlineWatchLater } from "react-icons/md";
import { UseFormReturnType } from "@mantine/form";

interface TimePickerInputProps {
    label: string;
    required?: boolean;
    withAsterisk?: boolean;
    propsName?: string;
    Form?: UseFormReturnType<any>;
    value?: string;
    onChange?: (value: string) => void;
}
export function TimePickerInput({
    label,
    required,
    withAsterisk,
    propsName,
    Form,
    value,
    onChange,
}: TimePickerInputProps) {
    const ref = useRef<HTMLInputElement>(null);

    const pickerControl = (
        <ActionIcon
            variant="subtle"
            color="gray"
            onClick={() => ref.current?.showPicker()}
        >
            <MdOutlineWatchLater
                style={{ width: rem(16), height: rem(16) }}
                stroke={1.5}
            />
        </ActionIcon>
    );

    // this component could be reworked using the Headless Component pattern
    if (Form && propsName) {
        return (
            <TimeInput
                label={label}
                ref={ref}
                rightSection={pickerControl}
                {...Form?.getInputProps(propsName)}
                required={required}
                withAsterisk={withAsterisk}
            />
        );
    }

    if (value && onChange) {
        return (
            <TimeInput
                label={label}
                ref={ref}
                rightSection={pickerControl}
                value={value}
                onChange={(v) => onChange(v.target.value)}
                required={required}
                withAsterisk={withAsterisk}
            />
        );
    }

    return (
        <TimeInput
            label={label}
            ref={ref}
            rightSection={pickerControl}
            required={required}
            withAsterisk={withAsterisk}
        />
    );
}
