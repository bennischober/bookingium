import { Slider } from "@mantine/core";

export interface ControlledSliderProps {
    marks: {
        value: number;
        label: string;
    }[];
    value: number;
    onChange: (value: number) => void;
    onChangeEnd?: (value: number) => void;
}

export function ControlledSlider({
    marks,
    value,
    onChange,
}: ControlledSliderProps) {
    return (
        <>
            <Slider
                label={(val) => marks.find((mark) => mark.value === val)?.label}
                value={value}
                onChange={onChange}
                step={25}
                marks={marks}
                styles={{ markLabel: { display: "none" } }}
            />
        </>
    );
}
