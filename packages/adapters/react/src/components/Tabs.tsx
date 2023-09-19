import React, { useEffect, useRef } from "react";
import { Tabs as MantineTabs, ScrollArea } from "@mantine/core";

export type TabProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
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
  defaultValue?: string;
  actions?: React.ReactNode;
  onChange?: (value: string) => void;
};

export const Tabs = (props: TabsProps) => {
  const { value, children, defaultValue, actions, onChange } = props;
  const viewportRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!viewportRef.current) return;
    React.Children.toArray(children).forEach((child, index) => {
      if (React.isValidElement(child)) {
        if (child.props.value === value && viewportRef.current) {
          const left = index * 150;
          if (left < viewportRef.current.scrollLeft)
            viewportRef.current.scrollLeft = index * 150 - 80;
          else if (
            left >
            viewportRef.current.scrollLeft +
              viewportRef.current.clientWidth -
              150
          )
            viewportRef.current.scrollLeft =
              index * 150 - viewportRef.current.clientWidth + 230;
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
      defaultValue={defaultValue}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          borderBottom: "solid 1px lightgray",
        }}
      >
        <ScrollArea
          type="never"
          onWheel={(e) => {
            if (!e.deltaY || !viewportRef.current) return;
            viewportRef.current.scrollLeft += e.deltaY + e.deltaX;
          }}
          viewportRef={viewportRef}
        >
          <MantineTabs.List
            sx={{
              flexWrap: "nowrap",
              borderBottom: "none !important",
            }}
          >
            {
              React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  return {
                    icon: child.props.icon,
                    label: child.props.label,
                    value: child.props.value,
                  };
                }
                return undefined;
              })
                ?.filter((props) => props !== undefined)
                .map(({ icon, label, value }, i) => (
                  <MantineTabs.Tab
                    key={value}
                    icon={icon}
                    value={value}
                    sx={{
                      padding: 8,
                      //   width: 150,
                      fontSize: "0.75rem",
                      borderRadius: 0,
                      borderRight: "solid 1px lightgray !important",
                      borderBottom: "none !important",
                      //   textOverflow: "ellipsis",
                    }}
                  >
                    {label}
                  </MantineTabs.Tab>
                )) as React.ReactNode
            }
          </MantineTabs.List>
        </ScrollArea>
        {actions && (
          <div
            style={{
              borderLeft: "1px solid #ccc",
              display: "flex",
              alignItems: "center",
            }}
          >
            {actions}
          </div>
        )}
      </div>
      {children}
    </MantineTabs>
  );
};
