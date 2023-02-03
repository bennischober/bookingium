import { Divider, Grid } from "@mantine/core";

export interface LeftAlignGroupProps {
    first: React.ReactNode;
    second: React.ReactNode;
    isIterable?: boolean;
    ratio?: Ratio;
}

type Ratio = "1:1" | "1:2" | "2:1" | "1:3" | "3:1" | "1:4" | "4:1";

export function LeftAlignGroup({ first, second, isIterable, ratio }: LeftAlignGroupProps) {
    
    const getSpans = () => {
        if(!ratio) ratio = "1:1";

        const ratios = ratio.split(":").map((x) => parseInt(x));
        const sum = ratios.reduce((a, b) => a + b, 0);

        const calculated = ratios.map((x) => (x / sum) * 12);

        return [calculated[0], calculated[1]]
    };

    const [firstSpan, secondSpan] = getSpans();

    return (
        <>
            <Grid align="flex-end">
                <Grid.Col span={firstSpan}>{first}</Grid.Col>
                <Grid.Col span={secondSpan}>{second}</Grid.Col>
            </Grid>
            {isIterable ? <Divider my="xl" /> : null}
        </>
    );
}
