import { useState } from "react";
import { Chart, Image } from "../molecules";
import { Data, Identity, ImageData } from "@monotonics/core";
import { DataTable } from "./DataTable";
import SplitPane, { SashContent, Pane } from "split-pane-react";
import { getViewBox } from "../../utils";

export type ImageViewProps = {
  data: Omit<Data, "raw">;
  selectedIndex?: number;
  resolveUrl: (id: Identity) => string;
  onClick?: (index: number | undefined) => void;
};

export const ImageView = (props: ImageViewProps): JSX.Element => {
  const { resolveUrl, data, onClick, selectedIndex } = props;
  const segments = (data.params as ImageData).segments;
  const [verticalSizes, setVerticalSizes] = useState<(number | string)[]>([
    "50%",
    "50%",
  ]);
  const [horizontalSizes, setHorizontalSizes] = useState<(number | string)[]>([
    "50%",
    "50%",
  ]);
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
              segments={segments}
              selectedIndex={selectedIndex}
              viewBox={
                selectedIndex !== undefined
                  ? getViewBox(segments[selectedIndex].points)
                  : undefined
              }
              onClick={(index) => onClick?.(index)}
            />
          </Pane>
          <Chart
            data={segments.map((s) => s.params)}
            onClick={(index) => onClick?.(index)}
          />
        </SplitPane>
      </Pane>
      <DataTable
        data={segments.map((s) => s.params)}
        onClick={(index) => onClick?.(index)}
      />
    </SplitPane>
  );
};
