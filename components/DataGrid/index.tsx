import { createStyles, Group, Table, useCss } from "@mantine/core";
import {
    createTable,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useTableInstance,
} from "@tanstack/react-table";
import { useState } from "react";
import {
    BsArrowDownUp as SortIcon,
    BsArrowUp as AscIcon,
} from "react-icons/bs";

export interface DataGridProps {
    columns: any[];
    data: any[];
}

const useStyles = createStyles((t) => ({
    tableContainer: {
        "& > thead > tr > th": {
            cursor: "pointer",
            borderRight: `1px solid ${
                t.colorScheme === "dark" ? t.colors.gray[8] : t.colors.gray[2]
            }`,
            ":last-child": { borderRight: `unset` },
            ":hover": {
                backgroundColor:
                    t.colorScheme === "dark"
                        ? t.colors.dark[4]
                        : t.colors.gray[3],
            },
        },
        "& > tbody > tr > td": {
            borderRight: `1px solid ${
                t.colorScheme === "dark" ? t.colors.gray[8] : t.colors.gray[2]
            }`,
            ":last-child": { borderRight: `unset` },
        },
    },
    sortDirectionIcon: { transition: "transform 200ms ease" },
}));

export function DataGrid({ columns, data }: DataGridProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const { classes } = useStyles();

    let table = createTable().setRowType<any>();

    const useTable = useTableInstance(table, {
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
    });

    return (
        <Table
            striped
            highlightOnHover
            verticalSpacing="md"
            className={classes.tableContainer}
        >
            <thead>
                {useTable.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : (
                                        <div
                                            {...{
                                                className:
                                                    header.column.getCanSort()
                                                        ? "cursor-pointer select-none"
                                                        : "",
                                                onClick:
                                                    header.column.getToggleSortingHandler(),
                                            }}
                                        >
                                            <Group noWrap position={"apart"}>
                                                {header.renderHeader()}
                                                {header.column.getIsSorted() ? (
                                                    <AscIcon
                                                        className={
                                                            classes.sortDirectionIcon
                                                        }
                                                        style={{
                                                            transform:
                                                                (header.column.getIsSorted() as string) ===
                                                                "asc"
                                                                    ? "rotate(180deg)"
                                                                    : "none",
                                                        }}
                                                    />
                                                ) : (
                                                    <SortIcon />
                                                )}
                                            </Group>
                                        </div>
                                    )}
                                </th>
                            );
                        })}
                    </tr>
                ))}
            </thead>
            <tbody>
                {useTable
                    .getRowModel()
                    .rows.slice(0, 10)
                    .map((row) => {
                        return (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <td key={cell.id}>
                                            {cell.renderCell()}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
            </tbody>
        </Table>
    );
}
