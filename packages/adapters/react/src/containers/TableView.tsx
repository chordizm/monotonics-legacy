import { useMemo } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from "@/components";
import { Badge, Box } from "@mantine/core";
import { useColors, useSelectedData, useSelectedItemIndex } from "@/store";
import { convertCamelCaseToWords } from "@/utils";

export const TableView = (_: {}): JSX.Element => {
  const [data] = useSelectedData();
  const [colors] = useColors();
  const [__, setSelectedIndex] = useSelectedItemIndex();
  const ignore = useMemo(() => {
    return data?.mimeType?.startsWith("image") ? ["points"] : [];
  }, [data]);
  const columns = useMemo(
    () =>
      Array.from(new Set(data?.items.flatMap((x) => Object.keys(x)))).filter(
        (x) => x !== "labels" && (ignore === undefined || !ignore.includes(x))
      ),
    [data]
  );
  return data ? (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Data</TableHeaderCell>
          {columns.map((column) => (
            <TableHeaderCell key={column}>
              {convertCamelCaseToWords(column)}
            </TableHeaderCell>
          ))}
          <TableHeaderCell>Labels</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.items.map((item, index) => (
          <TableRow key={index} onClick={() => setSelectedIndex(index)}>
            <TableCell>{index + 1}</TableCell>
            {columns.map((column) => (
              <TableCell key={column}>{JSON.stringify(item[column])}</TableCell>
            ))}
            <TableCell>
              {item.labels.map((label) => (
                <Badge
                  key={label}
                  leftSection={
                    <Box
                      bg={colors[label]}
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
  ) : (
    <></>
  );
};
