"use client";

import classes from "./index.module.css";
import { Group, Table } from "@mantine/core";
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import {
    BsArrowDownUp as SortIcon,
    BsArrowUp as AscIcon,
} from "react-icons/bs";
import { DataGridProps, DataGridSettingsValues } from "../../../types";
import {
    getDataGridSettings,
    setLocalStorageItem,
} from "../../../utils/browserHandle";
import { DataGridHeader } from "../DataGridHeader";

// move interface and styles to other file

// other table interactions todo:
// https://github.com/TanStack/table/blob/alpha/examples/react/column-sizing/src/main.tsx
// https://github.com/TanStack/table/blob/alpha/examples/react/pagination/src/main.tsx
// or
// https://github.com/TanStack/table/blob/alpha/examples/react/pagination-controlled/src/main.tsx
// any maybe
// https://github.com/TanStack/table/tree/alpha/examples/react/row-selection

export function DataGrid({ columns, data, title }: DataGridProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [settings, setSettings] = useState<DataGridSettingsValues>(
        getDataGridSettings()
    );

    const table = useReactTable({
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

    const onChangeSettings = (settings: DataGridSettingsValues) => {
        setSettings(settings);

        // save settings to browser or db?
        setLocalStorageItem("memo-data-grid", JSON.stringify(settings));
    };

    return (
        <>
            <DataGridHeader title={title} changeSettings={onChangeSettings} />
            <Table
                striped
                highlightOnHover
                //verticalSpacing={settings.verticalSpacing}
                //horizontalSpacing={settings.horizontalSpacing}
                //fontSize={settings.fontSize}
                verticalSpacing="xl"
                className={classes.tableContainer}
            >
                <Table.Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Table.Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Table.Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                    >
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
                                                <Group
                                                    wrap="nowrap"
                                                    justify="space-between"
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .footer,
                                                        header.getContext()
                                                    )}
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
                                    </Table.Th>
                                );
                            })}
                        </Table.Tr>
                    ))}
                </Table.Thead>
                <Table.Tbody>
                    {table
                        .getRowModel()
                        .rows.slice(0, 10)
                        .map((row) => {
                            return (
                                <tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                </Table.Tbody>
            </Table>
        </>
    );
}
