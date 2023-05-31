import React, { useMemo, useState } from "react";
import SplitPane, { SashContent, Pane } from "split-pane-react";

export type DataViewProps = React.PropsWithChildren<{}>;

export const DataView = (props: DataViewProps) => {
  const [sizes, setSizes] = useState<(number | string)[]>(["50%", "50%"]);
  const { children } = props;
  const { main, sub } = useMemo(() => {
    const main = React.Children.toArray(children)[0];
    const sub = React.Children.toArray(children).slice(1);
    return { main, sub };
  }, [children]);

  return (
    <SplitPane
      sashRender={(_, active) => <SashContent active={active} type="vscode" />}
      style={{ flex: 1, width: "100%", height: "100%" }}
      split="horizontal"
      sizes={sizes}
      onChange={setSizes}
    >
      <Pane minSize={"30%"} maxSize={"70%"}>
        {main}
      </Pane>
      <>{sub}</>
    </SplitPane>
  );
};
