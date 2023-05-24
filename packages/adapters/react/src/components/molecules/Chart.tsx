import { useMemo, useState } from "react";
import { Flex, Box, Divider, Center } from "@mantine/core";
import {
  ResponsiveContainer,
  ScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  Cell,
} from "recharts";
import { Select } from "../atoms";
import { convertCamelCaseToWords } from "../../utils";

export type ChartProps = {
  data: Record<string, unknown>[];
  onClick?: (index: number) => void;
};

export const Chart = (props: ChartProps): JSX.Element => {
  const { data, onClick } = props;
  const columns = useMemo(
    () => Array.from(new Set(data.flatMap((s) => Object.keys(s)))),
    [data]
  );
  const [xAxis, setXAxis] = useState(columns[0]);
  const [yAxis, setYAxis] = useState(columns[1]);
  return (
    <Flex
      direction="column"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box style={{ flex: 1, height: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 10,
              bottom: 10,
              right: 40,
            }}
          >
            <CartesianGrid />
            <XAxis
              fontSize="0.8rem"
              type="number"
              dataKey={xAxis}
              name={convertCamelCaseToWords(xAxis)}
            />
            <YAxis
              fontSize="0.8rem"
              type="number"
              dataKey={yAxis}
              name={convertCamelCaseToWords(yAxis)}
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter
              isAnimationActive={false}
              fontSize="0.8rem"
              name="Segments"
              data={data}
              fill="#8884d8"
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  style={{ cursor: "pointer", fill: "rgb(206, 55, 47)" }}
                  onClick={() => onClick?.(index)}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </Box>
      <Divider />
      <Center>
        <Flex p="sm" gap="sm">
          <Select
            label="XAxis"
            value={xAxis}
            options={columns.map((column) => ({
              value: column,
              label: convertCamelCaseToWords(column),
            }))}
            onChange={(value) => setXAxis(value)}
          />
          <Select
            label="YAxis"
            value={yAxis}
            options={columns.map((column) => ({
              value: column,
              label: convertCamelCaseToWords(column),
            }))}
            onChange={(value) => setYAxis(value)}
          />
        </Flex>
      </Center>
      <Divider />
    </Flex>
  );
};
