import { Autocomplete } from "@mantine/core";
import { SearchableProps } from "../../../types";

export function Searchable({
    label,
    placeholder,
    data,
    required,
    inputProps,
    Form,
}: SearchableProps) {
    return (
        <Autocomplete
            label={label}
            placeholder={placeholder ?? "Type to search"}
            data={data}
            {...Form.getInputProps(inputProps)}
            required={required ?? true}
        />
    );
}
