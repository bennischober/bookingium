import { createStyles, Group, Table } from "@mantine/core";
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
import { DataGridProps, DataGridSettingsValues } from "../../types";
import {
    getDataGridSettings,
    setLocalStorageItem,
} from "../../utils/browserHandle";
import { DataGridHeader } from "../DataGridHeader";

// move interface and styles to other file

// other table interactions todo:
// https://github.com/TanStack/table/blob/alpha/examples/react/column-sizing/src/main.tsx
// https://github.com/TanStack/table/blob/alpha/examples/react/pagination/src/main.tsx
// or
// https://github.com/TanStack/table/blob/alpha/examples/react/pagination-controlled/src/main.tsx
// any maybe
// https://github.com/TanStack/table/tree/alpha/examples/react/row-selection

// Grid settings could also be added => user specific text size and column spacing

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

export function DataGrid({ columns, data, title }: DataGridProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [settings, setSettings] = useState<DataGridSettingsValues>(
        getDataGridSettings()
    );
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
                verticalSpacing={settings.verticalSpacing}
                horizontalSpacing={settings.horizontalSpacing}
                fontSize={settings.fontSize}
                className={classes.tableContainer}
            >
                <thead>
                    {useTable.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th
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
                                                    noWrap
                                                    position={"apart"}
                                                >
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
        </>
    );
}
