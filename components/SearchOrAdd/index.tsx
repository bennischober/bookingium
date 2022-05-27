import { Autocomplete, Button, Stack } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form/lib/use-form";

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
        <>
            <Stack>
                <Autocomplete
                    label={ac.label}
                    placeholder={ac.placeholder}
                    data={ac.data}
                    {...ac.useForm.getInputProps(ac.inputProps)}
                    required={ac.required ? ac.required : false}
                />
                <Button onClick={() => md.handleOpen(true)}>{md.button}</Button>
            </Stack>
        </>
    );
}
