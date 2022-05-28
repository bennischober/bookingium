import { useMemo } from "react";
import { Button, Paper, ScrollArea, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { DealMemoListProps, DealMemoListValues } from "../../types";
import { DataGrid } from "../DataGrid";
import { createTable } from "@tanstack/react-table";
import { changeRoute } from "../../utils/appHandles";

export function DealMemoList({ memos }: DealMemoListProps) {
    const router = useRouter();

    const handleDealClick = (dealId: string) => {
        changeRoute(router, `/deal-memo/${dealId}`, { from: router.pathname });
    };

    let table = createTable().setRowType<DealMemoListValues>();

    const columns = useMemo(
        () => [
            table.createDataColumn("dealId", {
                cell: (info) => (
                    <Button
                        variant="subtle"
                        onClick={() => handleDealClick(info.getValue())}
                    >
                        {info.getValue()}
                    </Button>
                ), // info.getValue()
                footer: (props) => props.column.id,
            }),
            table.createDataColumn("deal", {
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            }),
            table.createDataColumn("price", {
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            }),
            table.createDataColumn("posters", {
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            }),
            table.createDataColumn("notes", {
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            }),
        ],
        []
    );

    const rows = memos.map((memo) => ({
        dealId: memo.dealId,
        deal: memo.deal,
        date: memo.date,
        price: memo.price,
        posters: memo.posters,
        notes: memo.notes,
    }));

    return (
        <ScrollArea>
            <Paper shadow="xs" p="xl" withBorder>
                <Title order={1}>Deal Memos</Title>
                <DataGrid columns={columns} data={rows} />
            </Paper>
        </ScrollArea>
    );
}
