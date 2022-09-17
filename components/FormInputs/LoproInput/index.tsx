import { Grid } from "@mantine/core";
import { LoproInputProps } from "../../../types";
import { CompanySearch } from "../../FormElements/Searchable/Company";
import { PersonSearch } from "../../FormElements/Searchable/Person";

export function LoproInput({ Form, person, company }: LoproInputProps) {
    return (
        <>
            <Grid>
                <Grid.Col span={6}>
                    <PersonSearch
                        Form={Form}
                        autocomplete={person}
                        inputProps="lopro.person"
                    />
                </Grid.Col>
                <Grid.Col span={6}>
                    <CompanySearch
                        Form={Form}
                        autocomplete={company}
                        inputProps="lopro.company"
                    />
                </Grid.Col>
            </Grid>
        </>
    );
}
