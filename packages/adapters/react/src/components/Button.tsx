import React from "react";
import { Center, Button as MantineButton } from "@mantine/core";

export type ButtonProps = React.PropsWithChildren<{
  type: "button" | "submit" | "reset";
  onClick?: () => void;
}>;

export const Button = (props: ButtonProps) => {
  const { type, children, onClick } = props;
  return (
    <MantineButton type={type} onClick={onClick}>
      <Center w="100%" p="sm">
        {children}
      </Center>
    </MantineButton>
  );
};
