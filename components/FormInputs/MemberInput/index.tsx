import {
    Autocomplete,
    Box,
    Button,
    Center,
    Divider,
    Grid,
    Tooltip,
} from "@mantine/core";
import { MdDelete } from "react-icons/md";
import { AcComponentsInputProps } from "../../../types";

export function MemberInput({ Form, autocomplete }: AcComponentsInputProps) {
    const members = Form.values.members.map((_: any, index: any) => {
        return (
            <Box key={index}>
                <Grid grow align="flex-end">
                    <Grid.Col span={10}>
                        <Autocomplete
                            label="Member"
                            placeholder="Type to search"
                            data={autocomplete}
                            {...Form.getInputProps(`members.${index}`)}
                            required
                        />
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <Tooltip label="Delete member">
                            <Button
                                onClick={() =>
                                    Form.removeListItem("members", index)
                                }
                                color="red"
                            >
                                <MdDelete />
                            </Button>
                        </Tooltip>
                    </Grid.Col>
                </Grid>
                <Divider my="xl" />
            </Box>
        );
    });

    return (
        <>
            {members}
            <Center>
                <Button
                    onClick={() => {
                        Form.insertListItem("members", "");
                    }}
                    variant="default"
                >
                    Add Member
                </Button>
            </Center>
        </>
    );
}
