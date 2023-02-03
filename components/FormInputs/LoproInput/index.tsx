import { Grid } from "@mantine/core";
import { LoproInputProps } from "../../../types";
import { SearchableIdProxy } from "../../FormElements/Searchable";

export function LoproInput({ Form, person, company }: LoproInputProps) {
    if (!person || !company) {
        console.info("LoproInput: person or company is undefined");
        return <></>;
    }

    const isEdit = person.length === 1 || company.length === 1;

    return (
        <>
            <Grid>
                <Grid.Col span={6}>
                    <SearchableIdProxy
                        Form={Form}
                        label="Person"
                        data={person}
                        inputProps="lopro.person"
                        isDisabled={isEdit}
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <SearchableIdProxy
                        Form={Form}
                        label="Company"
                        data={company}
                        inputProps="lopro.company"
                        isDisabled={isEdit}
                    />
                </Grid.Col>
            </Grid>
        </>
    );
}
