import React, { useState } from "react";
import { Table as MantineTable, ScrollArea } from "@mantine/core";

export type TableProps = React.DetailedHTMLProps<
  React.TableHTMLAttributes<HTMLTableElement>,
  HTMLTableElement
>;

export const Table = (props: TableProps): JSX.Element => {
  const { children } = props;
  const [{ y }, onScrollPositionChange] = useState({ x: 0, y: 0 });
  return (
    <ScrollArea
      w="100%"
      h="100%"
      onScrollPositionChange={onScrollPositionChange}
    >
      <MantineTable
        highlightOnHover
        withColumnBorders
        fontSize="xs"
        verticalSpacing="xs"
        sx={{
          width: "100%",
          "&>thead": {
            top: 0,
            position: "sticky",
            width: "100%",
            transition: "box-shadow 30ms ease-in",
            boxShadow: y !== 0 ? "0px 0px 5px rgba(0, 0, 0, 0.25)" : undefined,
          },
        }}
      >
        {children}
      </MantineTable>
    </ScrollArea>
  );
};

export type TableHeadProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

export const TableHead = (props: TableHeadProps): JSX.Element => {
  return <thead {...props} style={{ background: "white" }} />;
};

export type TableBodyProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableSectionElement>,
  HTMLTableSectionElement
>;

export const TableBody = (props: TableBodyProps): JSX.Element => {
  return <tbody {...props} />;
};

export type TableRowProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLTableRowElement>,
  HTMLTableRowElement
>;

export const TableRow = (props: TableRowProps): JSX.Element => {
  return <tr {...props} />;
};

export type TableCellProps = React.DetailedHTMLProps<
  React.TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

export const TableCell = (props: TableCellProps): JSX.Element => {
  return <td {...props} />;
};

export type TableHeaderCellProps = React.DetailedHTMLProps<
  React.ThHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>;

export const TableHeaderCell = (props: TableHeaderCellProps): JSX.Element => {
  return <th {...props} />;
};
