import { useEffect, useMemo, useState } from "react";
import { Paper, ScrollArea, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { DealMemoListProps, DealMemoListValues } from "../../../types";
import { DataGrid } from "../../Grid/DataGrid";
import { createTable, useReactTable, ColumnDef } from "@tanstack/react-table";
import { changeRoute, isPopulated } from "../../../utils/appHandles";
import dayjs from "dayjs";
import { IBand } from "../../../models/band";

export function DealMemoList({ memos }: DealMemoListProps) {
    const [bandData, setBandData] = useState<IBand[]>([] as IBand[]);
    const router = useRouter();

    // maybe try this already on ssr?
    useEffect(() => {
        let data: IBand[] = [];
        memos.forEach((memo) => {
            if (isPopulated<IBand>(memo.bandid)) {
                data.push(memo.bandid);
            }
        });
        setBandData(data);
    }, [memos]);

    const handleDealClick = (dealId: string) => {
        changeRoute(router, `/deal-memo/${dealId}`, { from: router.pathname });
    };

    interface Test {
        dealId: string;
        band: string;
        deal: string;
        date: string;
        fee: number;
        status: string;
    }

    const columns = useMemo<ColumnDef<Test>[]>(
        () => [
            {
                id: "dealId",
                header: "dealId",
                accessorKey: "dealId",
                cell: info => (
                    <Text
                        underline
                        variant="link"
                        style={{ cursor: "pointer", fontSize: "inherit" }}
                        onClick={() => handleDealClick(info.getValue())}
                    >
                        {info.getValue()}
                    </Text>
                ),
                footer: (props) => props.column.id,
            },
            {
                id: "band",
                header: "band",
                accessorKey: "band",
                cell: (props) => props.getValue(),
                footer: (props) => props.column.id,
            },
            {
                id: "date",
                header: "date",
                accessorKey: "date",
                cell: (props) => dayjs(props.getValue()).format("DD.MM.YYYY"),
                footer: (props) => props.column.id,
            },
            {
                id: "deal",
                header: "deal",
                accessorKey: "deal",
                cell: (props) => props.getValue(),
                footer: (props) => props.column.id,
            },
            {
                id: "fee",
                header: "fee",
                accessorKey: "fee",
                cell: (props) => props.getValue(),
                footer: (props) => props.column.id,
            },
            {
                id: "status",
                header: "status",
                accessorKey: "status",
                cell: (info) => info.getValue(),
                footer: (props) => props.column.id,
            },
        ],
        []
      )

    const rows: Test[] = memos.map((memo, index) => ({
        dealId: memo.dealId,
        band:
            bandData[index] && bandData[index].name ? bandData[index].name : "",
        deal: memo.deal,
        date: memo.date,
        fee: memo.fee,
        status: memo.status,
    }));

    return (
        <ScrollArea>
            <Paper shadow="xs" p="xl" withBorder>
                <DataGrid columns={columns} data={rows} title="Deal Memos" />
            </Paper>
        </ScrollArea>
    );
}
