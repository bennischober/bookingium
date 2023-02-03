import { Center, Paper } from "@mantine/core";
import { FormContainerProps } from "../../../types";

export function FormContainer({ children, center, sx }: FormContainerProps) {
    const style = sx ?? { minWidth: 300, maxWidth: 750, width: "100vw" };
    const cent = center ?? true;
    const paper = (
        <Paper withBorder p={30} mt={30} radius="xs" sx={style}>
            {children}
        </Paper>
    );
    const comp = cent ? <Center>{paper}</Center> : paper;
    return comp;
}
