import { Searchable } from "..";
import { AcComponentsInputProps } from "../../../../types";

export function CompanySearch({
    Form,
    autocomplete,
    inputProps,
    label,
}: AcComponentsInputProps) {
    return (
        <Searchable
            label={label ?? "Company"}
            placeholder="Type to search"
            data={autocomplete}
            inputProps={inputProps ?? "company"}
            Form={Form}
            required
        />
    );
}
