import { Data } from "@monotonics/core";
import { Chart } from "../components";
import { getColors } from "../utils";
import { useMemo } from "react";

export type ChartViewProps = {
  data: Data;

  onClick?: (index?: number) => void;
};

export const ChartView = ({ data, onClick }: ChartViewProps) => {
  const colors = data ? getColors(data) : {};
  const ignore = useMemo(() => {
    return data?.mimeType?.startsWith("image") ? ["points"] : [];
  }, [data]);
  return data ? (
    <Chart
      data={data}
      colors={colors}
      ignore={ignore}
      onClick={(index) => onClick?.(index)}
    />
  ) : (
    <>Data not found</>
  );
};
