import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  Text,
  Flex,
  Divider,
  ScrollArea,
  Center,
  ActionIcon,
} from "@mantine/core";
import SplitPane, { SashContent, Pane } from "split-pane-react";
import {
  IconDatabase,
  IconPlus,
  IconSettings,
  IconSubtask,
} from "@tabler/icons-react";

export type AccordionProps = React.PropsWithChildren<{}>;

export const Accordion = (props: AccordionProps) => {
  const children = React.Children.toArray(props.children);
  const { main, sub } = useMemo(() => {
    const main = React.Children.toArray(children)[0];
    const sub = React.Children.toArray(children).slice(1);
    return { main, sub };
  }, [children]);
  const [sizes, setSizes] = useState<(number | string)[]>([]);
  const [maxSize, setMaxSize] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver((entries) => {
      const { height } = entries[0].contentRect;
      if (sizes.length === 0) {
        const size = Math.ceil(height / 2);
        setSizes([size, height - size]);
      }
      setMaxSize(height - 42);
    });
    ro.observe(container);
    return () => {
      ro.unobserve(container);
      ro.disconnect();
    };
  }, [containerRef.current]);
  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <SplitPane
        sashRender={(_, active) => (
          <SashContent active={active} type="vscode" />
        )}
        style={{ width: "100%", height: "100%" }}
        split="horizontal"
        sizes={sizes}
        onChange={setSizes}
      >
        <Pane minSize={"42px"} maxSize={maxSize}>
          <Flex p="xs" fz="sm">
            <Center ml={4}>
              <IconDatabase size="1rem" />
              <Text ml={4}>Dataset</Text>
            </Center>
            <span style={{ flex: 1 }} />
            <ActionIcon size="xs">
              <IconPlus />
            </ActionIcon>
          </Flex>
          <Divider />
          <ScrollArea w="100%" h="calc(100% - 42px)">
            {main}
          </ScrollArea>
        </Pane>
        <div style={{ height: "100%" }}>
          <Divider />
          <Flex p="xs" fz="sm">
            <Center ml={4}>
              <IconSubtask size="1rem" />
              <Text ml={4}>Tasks</Text>
            </Center>
            <span style={{ flex: 1 }} />
            <ActionIcon size="xs">
              <IconSettings />
            </ActionIcon>
          </Flex>
          <Divider />
          <ScrollArea w="100%" h="calc(100% - 42px)">
            {sub}
          </ScrollArea>
        </div>
      </SplitPane>
    </div>
  );
};
