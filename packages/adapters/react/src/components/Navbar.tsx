import { Navbar as MantineNavbar } from "@mantine/core";
import React from "react";

export type NavbarSection = {
  title: React.ReactNode;
  icon?: React.ReactNode;
  links: {
    title: string;
    active?: boolean;
    onClick: () => void;
  }[];
};

export type NavbarProps = React.PropsWithChildren<{
  opened: boolean;
}>;

export const Navbar = (props: NavbarProps) => {
  const { opened, children } = props;
  return (
    <MantineNavbar
      hidden={!opened}
      hiddenBreakpoint="md"
      width={{ md: 240 }}
      sx={{
        height: "calc(100% - var(--mantine-header-height, 0px))",
        overflow: "auto",
      }}
    >
      {children}
    </MantineNavbar>
  );
};
