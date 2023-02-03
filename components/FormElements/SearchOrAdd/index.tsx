import { Button, Tooltip } from "@mantine/core";
import { MdOutlineAdd } from "react-icons/md";
import { SearchOrAddProps } from "../../../types";
import { LeftAlignGroup } from "../../Layout/LeftAlignGroup";
import { SearchableIdProxy } from "../Searchable";

export function SearchOrAdd({
    Form,
    inputProps,
    label,
    placeholder,
    required,
    data,
    buttonLabel,
    handleOpen,
}: SearchOrAddProps) {
    if (!label) label = "Search or Add";

    return (
        <LeftAlignGroup
            first={
                <SearchableIdProxy
                    Form={Form}
                    label={label}
                    inputProps={inputProps}
                    placeholder={placeholder}
                    data={data}
                    required={required}
                />
            }
            second={
                <Tooltip label={buttonLabel}>
                    <Button
                        variant="default"
                        onClick={() => handleOpen(true)}
                        style={{ maxWidth: 56 }}
                    >
                        <MdOutlineAdd />
                    </Button>
                </Tooltip>
            }
        />
    );
}
