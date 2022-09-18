import { Searchable } from "..";
import { AcComponentsInputProps } from "../../../../types";

export function PersonSearch({
    Form,
    autocomplete,
    inputProps,
    label,
}: AcComponentsInputProps) {
    return (
        <Searchable
            label={label ?? "Person"}
            placeholder="Type to search"
            data={autocomplete}
            inputProps={inputProps ?? "person"}
            Form={Form}
            required
        />
    );
}
