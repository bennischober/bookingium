import { Button, Divider, Grid, Text, Tooltip } from "@mantine/core";
import { MdDelete, MdEdit } from "react-icons/md";
import { SearchableEditDeleteProps } from "../../../../types";
import { PersonSearch } from "../../Searchable/Person";

export function PersonSearchCRUD({
    Form,
    label,
    data,
    inputProps,
    isEdit,
    index,
    handleEdit,
}: SearchableEditDeleteProps) {
    return (
        <>
            <Grid align="flex-end">
                <Grid.Col span={10}>
                    <PersonSearch
                        Form={Form}
                        label={label}
                        autocomplete={data}
                        inputProps={`${inputProps}.${index}`}
                        isEdit={isEdit}
                    />
                </Grid.Col>
                <Grid.Col span={1}>
                    {isEdit ? (
                        <Tooltip label="Edit field">
                            <Button
                                onClick={() =>
                                    handleEdit(Form.values[inputProps][index])
                                }
                            >
                                <MdEdit />
                            </Button>
                        </Tooltip>
                    ) : null}
                </Grid.Col>
                <Grid.Col span={1}>
                    <Tooltip label="Delete field">
                        <Button
                            onClick={() =>
                                Form.removeListItem(inputProps, index)
                            }
                            color="red"
                        >
                            <MdDelete />
                        </Button>
                    </Tooltip>
                </Grid.Col>
            </Grid>
            <Divider my="xl" />
        </>
    );
}
