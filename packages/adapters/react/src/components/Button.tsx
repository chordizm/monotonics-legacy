import React from "react";
import { Center, Button as MantineButton } from "@mantine/core";

export type ButtonProps = React.PropsWithChildren<{
  type: "button" | "submit" | "reset";
  fullWidth?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick?: () => void;
}>;

export const Button = (props: ButtonProps) => {
  const { disabled, type, children, fullWidth, style, onClick } = props;
  return (
    <MantineButton
      variant="light"
      disabled={disabled}
      type={type}
      onClick={onClick}
      style={{ ...style, width: fullWidth ? "100%" : style?.width }}
    >
      <Center w="100%" p="sm">
        {children}
      </Center>
    </MantineButton>
  );
};
