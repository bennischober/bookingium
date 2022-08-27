import { Paper, ScrollArea, Text } from "@mantine/core";
import { ColumnDef } from "@tanstack/table-core";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { IBand } from "../../../models/band";
import { BandListValues } from "../../../types";
import { DataGrid } from "../../Grid/DataGrid";

export interface BandListProps {
    bands: IBand[];
}

export function BandList({ bands }: BandListProps) {
    console.log(bands);

    const router = useRouter();

    const handleBandClick = (bandId: string) => {
        router.push(`/band/${bandId}`);
    };

    const columns = useMemo<ColumnDef<BandListValues>[]>(
        () => [
            {
                id: "bandId",
                header: "bandId",
                accessorKey: "bandId",
                cell: (info) => (
                    <Text
                        underline
                        variant="link"
                        style={{ cursor: "pointer", fontSize: "inherit" }}
                        onClick={() =>
                            handleBandClick(info.getValue() as string)
                        }
                    >
                        <>{info.getValue()}</>
                    </Text>
                ),
                footer: (props) => props.column.id,
            },
            {
                id: "name",
                header: "name",
                accessorKey: "name",
                cell: (props) => props.getValue(),
                footer: (props) => props.column.id,
            },
            {
                id: "website",
                header: "website",
                accessorKey: "website",
                cell: (props) => props.getValue(),
                footer: (props) => props.column.id,
            },
            {
                id: "country",
                header: "country",
                accessorKey: "country",
                cell: (props) => props.getValue(),
                footer: (props) => props.column.id,
            },
            // {
            //     id: "genre",
            //     header: "genre",
            //     accessorKey: "genre",
            //     cell: (props) => props.getValue(),
            //     footer: (props) => props.column.id,
            // },
        ],
        []
    );
    const rows = useMemo<BandListValues[]>(
        () =>
            bands.map((band) => ({
                bandId: band.bandid,
                name: band.name,
                website: band.company.contact.homepage,
                country: band.company.address.country,
                //genre: band.genre,
            })),
        [bands]
    );
    return (
        <ScrollArea>
            <Paper shadow="xs" p="xl" withBorder>
                <DataGrid columns={columns} data={rows} title="Bands" />
            </Paper>
        </ScrollArea>
    );
}
