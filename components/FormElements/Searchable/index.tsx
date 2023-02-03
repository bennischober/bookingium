import {
    Autocomplete,
    Divider,
    Grid,
    SelectItemProps,
    Text,
    TextInput,
} from "@mantine/core";
import { SearchableInputProps, SearchableIdProxyProps } from "../../../types";
import { forwardRef, useEffect, useState } from "react";

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

export interface ItemProps extends SelectItemProps {
    value: string; // value == id
    display: string; // key == name
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

    // reset value if form is reset
    useEffect(() => {
        if(!Form.isDirty()) {
            setValue("");
        }
    }, [Form.isDirty()]);

    if (!data) {
        console.error("SearchableIdProxy: data is undefined.");
        return <></>;
    }

    // Note: isDisabled means data has exactly one entry
    if (isDisabled) {
        return (
            <>
                <TextInput value={data[0].display} disabled={isDisabled} />
            </>
        );
    }

    // data for autocomplete
    const autocomplete =
        data?.map((item) => ({
            ...item,
            display: item.value,
            value: item.display,
        })) ?? [];

    // render overwrite
    const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
        ({ value, display, ...others }: ItemProps, ref) => (
            <div ref={ref} {...others}>
                <Text>{value}</Text>
            </div>
        )
    );

    // change initial data. can happen, if this is used in a popup and the popup closes => data is saved but the selected value is not displayed/saved
    if (value === "" && Form.getInputProps(inputProps).value !== "") {
        console.info(
            `Trying to set a value for ${inputProps} in SearchableIdProxy.`
        );

        const item = autocomplete.find(
            (item) => item.display === Form.getInputProps(inputProps).value
        );
        if (item) {
            setValue(item.value);
        }
        // console.log(item, autocomplete, Form.values, inputProps);
    }

    // standalone component
    const searchable = (
        <>
            <Autocomplete
                label={label}
                placeholder={placeholder ?? "Type to search"}
                itemComponent={AutoCompleteItem}
                data={autocomplete}
                limit={limit}
                required={required ?? true}
                filter={(value, item) =>
                    item.value.toLowerCase().includes(value.toLowerCase())
                }
                onItemSubmit={(value) => {
                    // handles the case, if you select an item
                    setValue(value.value);
                    const item = autocomplete.find(
                        (item) => item.value === value.value
                    );
                    if (item) {
                        Form.setFieldValue(inputProps, item.display);
                    }
                }}
                onChange={(value) => {
                    // handles the case, if you want to change the input
                    // if value is not in autocomplete, set it to empty
                    const item = autocomplete.find(
                        (item) => item.value === value
                    );
                    if (!item) {
                        setValue("");
                        Form.setFieldValue(inputProps, "");
                    }
                }}
                value={value}
                disabled={isDisabled}
            />
        </>
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
