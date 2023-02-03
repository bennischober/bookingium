import { Button, Tooltip } from "@mantine/core";
import { ActionButtonProps } from "../../../../types";

export function ActionButton({
    Icon,
    handleOnClick,
    tooltip,
    buttonColor,
}: ActionButtonProps) {
    if (!tooltip) {
        return (
            <Button onClick={handleOnClick} color={buttonColor}>
                <Icon />
            </Button>
        );
    }

    return (
        <Tooltip label={tooltip}>
            <Button onClick={handleOnClick} color={buttonColor}>
                <Icon />
            </Button>
        </Tooltip>
    );
}
