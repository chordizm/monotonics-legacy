import React from "react";
import { Provider as JotaiProvider, createStore } from "jotai";
import { MantineProvider } from "@mantine/core";

export type ProviderProps = React.PropsWithChildren<{}>;

export const Provider = (props: ProviderProps) => {
  const { children } = props;
  const store = createStore();
  return (
    <MantineProvider>
      <JotaiProvider store={store}>{children}</JotaiProvider>
    </MantineProvider>
  );
};
