import { Autocomplete, Button, Group, Tooltip } from "@mantine/core";
import { MdOutlineAdd } from "react-icons/md";
import { SearchOrAddProps } from "../../../types";

// make global styles file => for maxWidth e.g.

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
                        style={{maxWidth: 56}}
                    >
                        <MdOutlineAdd />
                    </Button>
                </Tooltip>
        </Group>
    );
}
