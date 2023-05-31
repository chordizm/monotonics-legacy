import React, { useEffect, useRef } from "react";
import { Tabs as MantineTabs, ScrollArea } from "@mantine/core";
import { convertCamelCaseToWords } from "@/utils";

export type TabProps = {
  value: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export const Tab = (props: TabProps) => {
  const { value, children } = props;
  return (
    <MantineTabs.Panel sx={{ height: "calc(100% - 30px)" }} value={value}>
      {children}
    </MantineTabs.Panel>
  );
};

export type TabsProps = {
  value?: string;
  children: React.ReactNode;
  onChange?: (value: string) => void;
};

export const Tabs = (props: TabsProps) => {
  const { value, children, onChange } = props;
  const viewportRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!viewportRef.current) return;
    React.Children.toArray(children).forEach((child, index) => {
      if (React.isValidElement(child)) {
        if (child.props.value === value && viewportRef.current) {
          const left = index * 150;
          if (left < viewportRef.current.scrollLeft)
            viewportRef.current.scrollLeft = index * 150;
          else if (
            left >
            viewportRef.current.scrollLeft +
              viewportRef.current.clientWidth -
              150
          )
            viewportRef.current.scrollLeft =
              index * 150 - viewportRef.current.clientWidth + 150;
        }
      }
    });
  }, [value]);
  return (
    <MantineTabs
      keepMounted={false}
      sx={{ height: "100%" }}
      value={value}
      onTabChange={(value) => {
        onChange?.(value ?? "");
      }}
      defaultValue={
        (
          React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return child.props.value;
            }
            return undefined;
          })?.filter((value) => value !== undefined) as string[]
        )[0]
      }
    >
      <ScrollArea
        type="never"
        onWheel={(e) => {
          if (!e.deltaY || !viewportRef.current) return;
          viewportRef.current.scrollLeft += e.deltaY + e.deltaX;
        }}
        viewportRef={viewportRef}
      >
        <MantineTabs.List sx={{ flexWrap: "nowrap" }}>
          {
            React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return { icon: child.props.icon, value: child.props.value };
              }
              return undefined;
            })
              ?.filter((props) => props !== undefined)
              .map(({ icon, value }) => (
                <MantineTabs.Tab
                  key={value}
                  icon={icon}
                  value={value}
                  sx={{
                    padding: 8,
                    width: 150,
                    fontSize: "0.75rem",
                    borderRadius: 0,
                    borderRight: "solid 1px lightgray !important",
                  }}
                >
                  {convertCamelCaseToWords(value)}
                </MantineTabs.Tab>
              )) as React.ReactNode
          }
        </MantineTabs.List>
      </ScrollArea>

      {children}
    </MantineTabs>
  );
};
