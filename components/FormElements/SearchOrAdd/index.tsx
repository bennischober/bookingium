import { Autocomplete, Button, Group, Tooltip } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/types";
import { MdOutlineAdd } from "react-icons/md";

export interface SearchOrAddProps {
    ac: {
        data: string[];
        useForm: UseFormReturnType<any>;
        required?: boolean;
        label: string;
        placeholder: string;
        inputProps: string;
    };
    md: {
        button: string;
        handleOpen: (state: boolean) => void;
    };
}

export function SearchOrAdd({ ac, md }: SearchOrAddProps) {
    return (
        <Group align="flex-end" grow>
            <Autocomplete
                label={ac.label}
                placeholder={ac.placeholder}
                data={ac.data}
                {...ac.useForm.getInputProps(ac.inputProps)}
                required={ac.required ? ac.required : false}
            />
                <Tooltip label={md.button}>
                    <Button
                        variant="default"
                        onClick={() => md.handleOpen(true)}
                    >
                        <MdOutlineAdd />
                    </Button>
                </Tooltip>
        </Group>
    );
}
