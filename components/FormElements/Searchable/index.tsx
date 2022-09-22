import { Autocomplete, Divider, Grid } from "@mantine/core";
import { SearchableInputProps } from "../../../types";

export function Searchable({
    Form,
    label,
    placeholder,
    autocomplete,
    inputProps,
    required,
    editChild,
    deleteChild,
    buttonChild,
    isIteratable,
    index,
}: SearchableInputProps) {
    const searchable = (
        <Autocomplete
            label={label}
            placeholder={placeholder ?? "Type to search"}
            data={autocomplete}
            {...Form.getInputProps(inputProps)}
            required={required ?? true}
        />
    );

    if (!editChild && !deleteChild && !buttonChild) {
        return searchable;
    }

    const ed = editChild ? 1 : 0;
    const del = deleteChild ? 1 : 0;
    const but = buttonChild ? 4 : 0;
    const span = 12 - ed - del - but;

    return (
        <>
            <Grid align="flex-end">
                <Grid.Col span={span}>{searchable}</Grid.Col>
                {editChild ? <Grid.Col span={ed}>{editChild}</Grid.Col> : null}
                {deleteChild ? (
                    <Grid.Col span={del}>{deleteChild}</Grid.Col>
                ) : null}
                {buttonChild ? (
                    <Grid.Col span={but}>{buttonChild}</Grid.Col>
                ) : null}
            </Grid>
            {isIteratable ? <Divider my="xl" /> : null}
        </>
    );
}
