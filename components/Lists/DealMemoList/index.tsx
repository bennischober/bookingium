import { useEffect, useMemo, useState } from "react";
import { Paper, ScrollArea, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { DealMemoListProps, DealMemoListValues } from "../../../types";
import { DataGrid } from "../../Grid/DataGrid";
import { ColumnDef } from "@tanstack/react-table";
import { isPopulated } from "../../../utils/appHandles";
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

    const handleDealClick = (dealid: string) => {
        router.push(`/deal-memo/${dealid}`);
    };

    const columns = useMemo<ColumnDef<DealMemoListValues>[]>(
        () => [
            {
                id: "dealid",
                header: "dealid",
                accessorKey: "dealid",
                cell: (info) => (
                    <Text
                        underline
                        variant="link"
                        style={{ cursor: "pointer", fontSize: "inherit" }}
                        onClick={() => handleDealClick(info.getValue() as string)}
                    >
                        <>{info.getValue()}</>
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
                cell: (props) => dayjs(props.getValue() as string).format("DD.MM.YYYY"),
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
    );

    const rows: DealMemoListValues[] = memos.map((memo, index) => ({
        dealid: memo.dealid,
        band:
            bandData[index] && bandData[index].name ? bandData[index].name : "",
        deal: memo.deal,
        date: dayjs(memo.date).toISOString(),
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
