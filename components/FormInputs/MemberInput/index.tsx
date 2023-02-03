import { Button, Center, Space, TextInput, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { MemberInputProps, SearchableIdProxyData } from "../../../types";
import { ActionButton } from "../../Core/Buttons/ActionButton";
import { MdDelete, MdEdit } from "react-icons/md";
import { SearchableIdProxy } from "../../FormElements/Searchable";
import { getNestedValue } from "../../../utils/appHandles";
import { LeftAlignGroup } from "../../Layout/LeftAlignGroup";

export function MemberInput({
    Form,
    isEdit,
    persons,
    inputProps,
    firstFieldLabel,
    secondFieldLabel,
}: MemberInputProps) {
    const router = useRouter();

    if (!persons) return null;

    const path = inputProps ?? "members";
    const ffl = firstFieldLabel ?? "Role";
    const sfl = secondFieldLabel ?? "Person";

    const personAutocomplete: SearchableIdProxyData[] = persons.map((p) => ({
        display: p.firstName + " " + p.lastName,
        value: p._id,
    }));

    const members = getNestedValue(Form.values, path).map(
        (item: any, index: any) => {
            const del = (
                <ActionButton
                    Icon={MdDelete}
                    handleOnClick={() => Form.removeListItem(path, index)}
                    tooltip="Delete field"
                    buttonColor="red"
                />
            );

            const edit = isEdit ? (
                <ActionButton
                    Icon={MdEdit}
                    handleOnClick={() => {
                        router.push(`/edit/person/${item}`);
                    }}
                    tooltip="Edit field"
                />
            ) : null;

            const role = persons.find((p) => p._id === item)?.role;

            return (
                <LeftAlignGroup
                    key={index}
                    first={
                        <TextInput
                            label={ffl}
                            value={role ?? ""}
                            onChange={() => {}}
                            disabled
                        />
                    }
                    second={
                        <SearchableIdProxy
                            Form={Form}
                            label={sfl}
                            inputProps={`${path}.${index}`}
                            data={personAutocomplete}
                            editChild={edit}
                            deleteChild={del}
                            required={false}
                        />
                    }
                    isIterable
                    ratio="1:2"
                />
            );
        }
    );

    return (
        <>
            <Title order={3}>Member</Title>
            <Space h="xl" />
            {members}
            <Center>
                <Button
                    onClick={() => {
                        Form.insertListItem(path, "");
                    }}
                    variant="default"
                >
                    Add Member
                </Button>
            </Center>
        </>
    );
}
