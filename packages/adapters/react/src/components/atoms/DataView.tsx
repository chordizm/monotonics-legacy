import { ActionIcon, Box, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import SplitPane, { SashContent, Pane } from "split-pane-react";

export type DataViewProps = {
  tl: JSX.Element;
  tr: JSX.Element;
  bottom: JSX.Element;
  onBack?: () => void;
};

export const DataView = (props: DataViewProps) => {
  const [verticalSizes, setVerticalSizes] = useState<(number | string)[]>([
    "50%",
    "50%",
  ]);
  const [horizontalSizes, setHorizontalSizes] = useState<(number | string)[]>([
    "50%",
    "50%",
  ]);
  const { tl, tr, bottom, onBack } = props;
  return (
    <Box display="flex" sx={{ flexDirection: "column", height: "100%" }}>
      <Box p="xs">
        <ActionIcon onClick={() => onBack?.()}>
          <IconArrowLeft />
        </ActionIcon>
      </Box>
      <Divider />
      <SplitPane
        sashRender={(_, active) => (
          <SashContent active={active} type="vscode" />
        )}
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
              {tl}
            </Pane>
            {tr}
          </SplitPane>
        </Pane>
        {bottom}
      </SplitPane>
    </Box>
  );
};
