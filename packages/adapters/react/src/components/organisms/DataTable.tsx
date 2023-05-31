import { useMemo } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "..";
import { Badge, Box } from "@mantine/core";
import { Data } from "@monotonics/core";

export type DataTableProps = {
  data: Omit<Data, "raw">;
  pallet: Record<string, string>;
  ignore?: string[];
  onClick?: (index: number) => void;
};

export const DataTable = (props: DataTableProps): JSX.Element => {
  const { data, pallet, ignore, onClick } = props;
  const columns = useMemo(
    () =>
      Array.from(new Set(data.items.flatMap((x) => Object.keys(x)))).filter(
        (x) => x !== "labels" && (ignore === undefined || !ignore.includes(x))
      ),
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
          <TableHeaderCell>labels</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.items.map((item, index) => (
          <TableRow key={index} onClick={() => onClick?.(index)}>
            <TableCell>{index}</TableCell>
            {columns.map((column) => (
              <TableCell key={column}>{JSON.stringify(item[column])}</TableCell>
            ))}
            <TableCell>
              {item.labels.map((label) => (
                <Badge
                  key={label}
                  leftSection={
                    <Box
                      bg={pallet[label]}
                      sx={(theme) => ({
                        width: theme.spacing.xs,
                        height: theme.spacing.xs,
                        borderRadius: "50%",
                      })}
                    />
                  }
                  color="gray"
                  variant="outline"
                >
                  {label}
                </Badge>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
