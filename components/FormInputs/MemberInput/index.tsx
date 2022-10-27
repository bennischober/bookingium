import { Box, Button, Center } from "@mantine/core";
import { useRouter } from "next/router";
import { IPerson } from "../../../models/person";
import { MemberInputProps } from "../../../types";
import { arrayToMap, mapToArray, toCombinedAutocomplete } from "../../../utils/appHandles";
import { ActionButton } from "../../Core/Buttons/ActionButton";
import { MdDelete, MdEdit } from "react-icons/md";
import { Searchable } from "../../FormElements/Searchable";

export function MemberInput({
    Form,
    isEdit,
    persons,
}: MemberInputProps) {
    const router = useRouter();

    const people = persons
        ? arrayToMap(persons, "_id")
        : new Map<string, IPerson>();

    const peopleArray = mapToArray(people);

    const autocomplete = toCombinedAutocomplete(persons, ['firstName', 'lastName'], ' ');

    const handleMemberEdit = (url: string) => {
        console.log(Form.isDirty());

        peopleArray.forEach((person, index) => {
            if (url === person.firstName + " " + person.lastName) {
                router.push(`/edit/person/oid/${person._id}`);
            }
        });
    };

    const members = Form.values.members.map((_: any, index: any) => {
        const del = (
            <ActionButton
                Icon={MdDelete}
                handleOnClick={() => Form.removeListItem("members", index)}
                tooltip="Delete field"
                buttonColor="red"
            />
        );

        const edit = isEdit ? (
            <ActionButton
                Icon={MdEdit}
                handleOnClick={() => {
                    handleMemberEdit(Form.values.members[index]);
                }}
                tooltip="Edit field"
            />
        ) : null;

        return (
            <Box key={index}>
                <Searchable
                    Form={Form}
                    label="Member"
                    autocomplete={autocomplete}
                    inputProps={`members.${index}`}
                    editChild={edit}
                    deleteChild={del}
                    isIteratable
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
