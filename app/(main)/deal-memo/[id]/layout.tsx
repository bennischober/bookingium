import { Flex } from "@mantine/core";

export default function Layout(props: {
    memo: React.ReactNode;
    hotel: React.ReactNode;
    head: React.ReactNode;
}) {
    return (
        <>
            {props.head}
            <Flex
                wrap="wrap"
                gap="sm"
                justify="center"
                align="flex-start"
                direction="row"
            >
                {props.memo}
                {props.hotel}
            </Flex>
        </>
    );
}
