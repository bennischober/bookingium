import { Box, Button, Center } from "@mantine/core";
import { useRouter } from "next/router";
import { IPerson } from "../../../models/person";
import { CompanyInputProps } from "../../../types";
import { PersonSearchCRUD } from "../../FormElements/SearchableEditDelete/Person";
import { arrayToMap, mapToArray } from "../../../utils/appHandles";

export function MemberInput({
    Form,
    autocomplete,
    isEdit,
    persons,
}: CompanyInputProps) {
    const router = useRouter();

    const people = persons
        ? arrayToMap(persons, "_id")
        : new Map<string, IPerson>();

    const peopleArray = mapToArray(people);

    const handleMemberEdit = (url: string) => {
        console.log(Form.isDirty());

        peopleArray.forEach((person, index) => {
            if (url === person.firstName + " " + person.lastName) {
                router.push(`/edit/person/oid/${person._id}`);
            }
        });
    };


    const members = Form.values.members.map((_: any, index: any) => {
        return (
            <Box key={index}>
                <PersonSearchCRUD
                    index={index}
                    handleEdit={handleMemberEdit}
                    Form={Form}
                    label={"Member"}
                    data={autocomplete}
                    inputProps={`members`}
                    isEdit={isEdit}
                />
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
