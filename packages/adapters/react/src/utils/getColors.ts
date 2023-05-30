import { Data } from "@monotonics/core";

export const getColors = (data?: Data): Record<string, string> => {
  const labels = Array.from(
    new Set(data?.items.map((item) => item.labels.sort().join("-")))
  ).sort();
  return labels.reduce(
    (prev, current, i) => ({
      ...prev,
      [current]: `hsl(${(i * 360) / labels.length}, 100%, 50%)`,
    }),
    {}
  );
};
