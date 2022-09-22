import { Grid } from "@mantine/core";
import { LoproInputProps } from "../../../types";
import { Searchable } from "../../FormElements/Searchable";

export function LoproInput({ Form, person, company }: LoproInputProps) {
    return (
        <>
            <Grid>
                <Grid.Col span={6}>
                    <Searchable
                        Form={Form}
                        label="Person"
                        autocomplete={person}
                        inputProps="lopro.person"
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <Searchable
                        Form={Form}
                        label="Company"
                        autocomplete={company}
                        inputProps="lopro.company"
                    />
                </Grid.Col>
            </Grid>
        </>
    );
}
