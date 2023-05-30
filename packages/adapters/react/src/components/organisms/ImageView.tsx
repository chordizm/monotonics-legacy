import { useState, useMemo } from "react";
import { Chart, Image } from "../molecules";
import { Data, Identity, Point } from "@monotonics/core";
import { DataTable } from "./DataTable";
import SplitPane, { SashContent, Pane } from "split-pane-react";
import { getViewBox } from "../../utils";

const getPallet = (labels: string[]): Record<string, string> => {
  console.log(labels);
  return labels.reduce(
    (prev, current, i) => ({
      ...prev,
      [current]: `hsl(${(i * 360) / labels.length}, 100%, 50%)`,
    }),
    {}
  );
};

export type ImageViewProps = {
  data: Omit<Data, "raw">;
  selectedIndex?: number;
  resolveUrl: (id: Identity) => string;
  onClick?: (index: number | undefined) => void;
};

export const ImageView = (props: ImageViewProps): JSX.Element => {
  const { resolveUrl, data, onClick, selectedIndex } = props;

  const [verticalSizes, setVerticalSizes] = useState<(number | string)[]>([
    "50%",
    "50%",
  ]);
  const [horizontalSizes, setHorizontalSizes] = useState<(number | string)[]>([
    "50%",
    "50%",
  ]);
  const pallet = useMemo(
    () =>
      getPallet(
        Array.from(
          new Set(data.items.map((s) => s.labels.sort().join("-")))
        ).sort()
      ),
    [data.items]
  );
  return (
    <SplitPane
      sashRender={(_, active) => <SashContent active={active} type="vscode" />}
      style={{ flex: 1, width: "100%", height: "100%" }}
      split="horizontal"
      sizes={verticalSizes}
      onChange={setVerticalSizes}
    >
      <Pane minSize={"30%"} maxSize={"70%"}>
        <SplitPane
          sashRender={(_, active) => (
            <SashContent active={active} type="vscode" />
          )}
          style={{
            width: "calc(100% - 1px)",
            height: "100%",
            borderRight: "solid 1px lightgray",
          }}
          split="vertical"
          sizes={horizontalSizes}
          onChange={setHorizontalSizes}
        >
          <Pane minSize={"30%"} maxSize={"70%"}>
            <Image
              src={resolveUrl(data.id)}
              colors={pallet}
              data={data}
              selectedIndex={selectedIndex}
              viewBox={
                selectedIndex !== undefined
                  ? getViewBox(data.items[selectedIndex].points as Point[])
                  : undefined
              }
              onClick={(index) => onClick?.(index)}
            />
          </Pane>
          <Chart
            data={data}
            colors={pallet}
            ignore={["points"]}
            onClick={(index) => onClick?.(index)}
          />
        </SplitPane>
      </Pane>
      <DataTable
        data={data}
        pallet={pallet}
        ignore={["points"]}
        onClick={(index) => onClick?.(index)}
      />
    </SplitPane>
  );
};
