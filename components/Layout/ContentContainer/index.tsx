import { Paper } from "@mantine/core";

export interface ContentContainerProps {
    children: React.ReactNode;
    center?: boolean;
    sx?: React.CSSProperties;
}

export function ContentContainer({
    children,
    center,
    sx,
}: ContentContainerProps) {
    return (
        <>
            <Paper shadow="xs" p="xl" radius="sm">
                {children}
            </Paper>
        </>
    );
}
