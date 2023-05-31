import { Chart } from "@/components";
import { useColors, useSelectedData, useSelectedItemIndex } from "@/store";
import { useMemo } from "react";

export const ChartView = () => {
  const [data] = useSelectedData();
  const [colors] = useColors();
  const [_, setSelectedIndex] = useSelectedItemIndex();
  const ignore = useMemo(() => {
    return data?.mimeType?.startsWith("image") ? ["points"] : [];
  }, [data]);
  return data ? (
    <Chart
      data={data}
      colors={colors}
      ignore={ignore}
      onClick={(index) => setSelectedIndex(index)}
    />
  ) : (
    <>Data not found</>
  );
};
