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
import { Select } from ".";
import { convertCamelCaseToWords } from "../utils";
import { Data } from "@monotonics/core";

export type ChartProps = {
  data: Omit<Data, "raw">;
  colors: Record<string, string>;
  ignore?: string[];
  onClick?: (index: number) => void;
};

export const Chart = (props: ChartProps): JSX.Element => {
  const { data, colors, ignore, onClick } = props;
  const columns = useMemo(
    () =>
      Array.from(new Set(data.items.flatMap((x) => Object.keys(x)))).filter(
        (x) => x !== "labels" && (ignore === undefined || !ignore.includes(x))
      ),
    [data]
  );
  const [xAxis, setXAxis] = useState<string | undefined>(columns[0]);
  const [yAxis, setYAxis] = useState<string | undefined>(columns[1]);
  return (
    <Flex
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Box style={{ flex: 1, width: 0 }}>
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
              name={xAxis && convertCamelCaseToWords(xAxis)}
            />
            <YAxis
              fontSize="0.8rem"
              type="number"
              dataKey={yAxis}
              name={yAxis && convertCamelCaseToWords(yAxis)}
            />
            <Tooltip cursor={{ strokeDasharray: "3 3" }} />
            <Scatter
              isAnimationActive={false}
              fontSize="0.8rem"
              name="Segments"
              data={data.items}
              fill="#8884d8"
            >
              {data.items.map(({ labels }, index) => (
                <Cell
                  key={`cell-${index}`}
                  style={{
                    cursor: "pointer",
                    fill: colors[labels.sort().join("-")] ?? "rgb(206, 55, 47)",
                  }}
                  onClick={() => onClick?.(index)}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </Box>
      <Divider orientation="vertical" />
      <Box p="sm" style={{ flex: 1, maxWidth: 320 }}>
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
      </Box>
      <Divider />
    </Flex>
  );
};
