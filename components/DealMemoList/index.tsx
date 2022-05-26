import { Button, Paper, Table, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { DealMemoListProps } from "../../types";

// Future ToDo:
// https://github.com/mantinedev/mantine/discussions/195
// https://codesandbox.io/s/react-table-datagrid-eojw8

export function DealMemoList({ memos }: DealMemoListProps) {
    const router = useRouter();

    const handleDealClick = (dealId: string) => {
        router.push(`/deal-memo/${dealId}`);
    };

    const rows = memos.map((memo) => (
        <tr key={memo.dealId}>
            <td>
                <Button
                    variant="subtle"
                    onClick={() => handleDealClick(memo.dealId)}
                >
                    {memo.dealId}
                </Button>
            </td>
            <td>{memo.deal}</td>
            <td>{memo.date}</td>
            <td>{memo.price}</td>
            <td>{memo.posters}</td>
            <td>{memo.notes}</td>
        </tr>
    ));

    return (
        <Paper shadow="xs" p="xl" withBorder>
            <Title order={1}>Deal Memos</Title>
            <Table>
                <thead>
                    <tr>
                        <th>Deal ID</th>
                        <th>Deal</th>
                        <th>Date</th>
                        <th>Price</th>
                        <th>Posters</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
        </Paper>
    );
}
