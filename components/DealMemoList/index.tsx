import React from "react";
import { Button, Paper, Table, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { DealMemoListProps } from "../../types";
import { DataGrid } from "../DataGrid";
import { createTable } from "@tanstack/react-table";

// Future ToDo:
// https://github.com/mantinedev/mantine/discussions/195
// https://codesandbox.io/s/react-table-datagrid-eojw8

export interface DealMemoListValues {
    dealId: string;
    deal: string;
    price: number;
    posters: number;
    notes: string;
}

export function DealMemoList({ memos }: DealMemoListProps) {
    const router = useRouter();

    const handleDealClick = (dealId: string) => {
        router.push(`/deal-memo/${dealId}`);
    };

    let table = createTable().setRowType<DealMemoListValues>();

    const columns = React.useMemo(
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
        <Paper shadow="xs" p="xl" withBorder>
            <Title order={1}>Deal Memos</Title>
            <DataGrid columns={columns} data={rows} />
        </Paper>
    );
}
