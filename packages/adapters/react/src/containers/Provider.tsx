import React from "react";
import { MantineProvider } from "@mantine/core";

export type ProviderProps = React.PropsWithChildren<{}>;

export const Provider = (props: ProviderProps) => {
  const { children } = props;
  return <MantineProvider>{children}</MantineProvider>;
};
