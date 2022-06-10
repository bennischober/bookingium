import { Slider } from "@mantine/core";
import { ControlledSliderProps } from "../../../types";

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
