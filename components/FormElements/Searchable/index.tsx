import { Autocomplete, Divider, Grid, TextInput } from "@mantine/core";
import { SearchableInputProps, SearchableIdProxyProps } from "../../../types";
import { useState } from "react";

interface GridableSearchProps {
    searchable: JSX.Element;
    editChild?: React.ReactNode;
    deleteChild?: React.ReactNode;
    buttonChild?: React.ReactNode;
    isIteratable?: boolean; // refers to if its a looped item or just a single item
}

// currently just a wrapper for autocomplete and local component
function GridableSearch({
    searchable,
    editChild,
    deleteChild,
    buttonChild,
    isIteratable,
}: GridableSearchProps) {
    const ed = editChild ? 2 : 0;
    const del = deleteChild ? 2 : 0;
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

export function Searchable({
    Form,
    label,
    limit,
    placeholder,
    autocomplete,
    inputProps,
    required,
    editChild,
    deleteChild,
    buttonChild,
    isIteratable,
    isDisabled,
}: SearchableInputProps) {
    const searchable = (
        <Autocomplete
            label={label}
            placeholder={placeholder ?? "Type to search"}
            data={autocomplete}
            {...Form.getInputProps(inputProps)}
            limit={limit}
            required={required ?? true}
            disabled={isDisabled}
        />
    );

    if (!editChild && !deleteChild && !buttonChild) {
        return searchable;
    }

    return (
        <GridableSearch
            searchable={searchable}
            editChild={editChild}
            deleteChild={deleteChild}
            buttonChild={buttonChild}
            isIteratable={isIteratable}
        />
    );
}

export function SearchableIdProxy({
    Form,
    label,
    limit,
    placeholder,
    data,
    inputProps,
    required,
    editChild,
    deleteChild,
    buttonChild,
    isIteratable,
    isDisabled,
}: SearchableIdProxyProps) {
    const [value, setValue] = useState<string>("");

    if (!data) {
        console.error("SearchableIdProxy: data is undefined.");
        return <></>;
    }

    // Note: isDisabled means data has exactly one entry
    // this is the case, if we are at the edit page
    // and the user is not allowed to change the value
    if (isDisabled) {
        return (
            <>
                <TextInput value={data[0].label} disabled={isDisabled} />
            </>
        );
    }

    const searchable = (
        <Autocomplete
            label={label}
            data={data}
            placeholder={placeholder ?? "Type to search"}
            limit={limit}
            value={value}
            onOptionSubmit={(value) => {
                // handles the case, if you select an item
                const item = data?.find(
                    (item) => item.value === value
                );
                if (item && item.label) {
                    setValue(item?.label ?? "");
                    Form.setFieldValue(inputProps, value);
                }
            }}
            onChange={(value) => {
                // handles the case, if you want to change the input
                // if value is not in autocomplete, set it to empty
                const item = data?.find(
                    (item) => item.label === value
                );
                if (!item) {
                    setValue("");
                    Form.setFieldValue(inputProps, "");
                }
            }}
            required={required ?? true}
            disabled={isDisabled}
        />
    );

    if (!editChild && !deleteChild && !buttonChild) {
        return searchable;
    }

    return (
        <GridableSearch
            searchable={searchable}
            editChild={editChild}
            deleteChild={deleteChild}
            buttonChild={buttonChild}
            isIteratable={isIteratable}
        />
    );
}
