import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import {
  fetchTableData,
  selectError,
  selectLoading,
  selectRows,
} from "../slices/tableSlice";
import "./HistoryTable.scss";

// Define the type for the data structure
type TableRow = {
  id: number;
  image_name: string;
  date: string;
  result: string;
};

export default function HistoryTable() {
  const dispatch = useAppDispatch();

  // Access table data, loading, and error state from Redux
  const rows = useAppSelector(selectRows);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchTableData());
  }, [dispatch]);

  // Define columns with TypeScript types
  const columns = React.useMemo<ColumnDef<TableRow>[]>(
    () => [
      {
        accessorKey: "image_name",
        header: "Image Name",
      },
      {
        accessorKey: "date",
        header: "Date",
      },
      {
        accessorKey: "result",
        header: "Result",
      },
    ],
    [],
  );

  // Define the table instance with proper types
  const table = useReactTable<TableRow>({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

/*
import fakeData from "../generated_data.json";
import React, { useMemo } from "react";
import {
  useReactTable,
  ColumnDef,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import "./HistoryTable.scss";

// Define the type for the data structure
type Data = {
  id: number;
  image_name: string;
  date: string;
  result: string;
};

// Example data
const fakeData: Data[] = [
  { id: 1, name: "Image1.jpg", date: "2024-12-01", result: "Success" },
  { id: 2, name: "Image2.jpg", date: "2024-12-02", result: "Failed" },
  { id: 3, name: "Image3.jpg", date: "2024-12-03", result: "Pending" },
];

export default function HistoryTable() {
  const data = React.useMemo<Data[]>(() => fakeData.slice(0, 5), []);
  // Define columns with TypeScript types
  const columns = useMemo<ColumnDef<Data>[]>(
    () => [
      {
        accessorKey: "image_name", // this refers to the `name` property of `Data`
        header: "Image Name",
      },
      {
        accessorKey: "date", // this refers to the `date` property of `Data`
        header: "Date",
      },
      {
        accessorKey: "result", // this refers to the `result` property of `Data`
        header: "Result",
      },
    ],
    [],
  );

  // Define the table instance with proper types
  const table = useReactTable<Data>({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}*/
/*
import * as React from "react";
import { useTable, Column } from "react-table";

type Data = {
  id: number;
  image_name: string;
  date: string;
  result: string;
};

export default function HistoryTable() {
  const data = React.useMemo<Data[]>(() => fakeData, []);

  const columns: Column<Data>[] = React.useMemo(
    () => [
      {
        Header: "Image Name",
        accessor: "image_name",
      },
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Result",
        accessor: "result",
      },
    ],
    [],
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Data>({ columns, data });

  return (
    <div className="App">
      <div className="container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()} key={column.id}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={row.id}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} key={cell.column.id}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
*/
