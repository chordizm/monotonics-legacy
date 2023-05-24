import { useMemo } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "../molecules";

export type DataTableProps = {
  data: Record<string, unknown>[];
  onClick?: (index: number) => void;
};

export const DataTable = (props: DataTableProps): JSX.Element => {
  const { data, onClick } = props;
  const columns = useMemo(
    () => Array.from(new Set(data.flatMap((x) => Object.keys(x)))),
    [data]
  );
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Data</TableHeaderCell>
          {columns.map((column) => (
            <TableHeaderCell key={column}>{column}</TableHeaderCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((x, index) => (
          <TableRow key={index} onClick={() => onClick?.(index)}>
            <TableCell>{index}</TableCell>
            {columns.map((column) => (
              <TableCell key={column}>
                {JSON.stringify(x[column]) ?? "-"}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
