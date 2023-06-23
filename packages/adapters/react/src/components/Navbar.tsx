import React from "react";
import {
  Navbar as MantineNavbar,
  Text,
  Flex,
  Divider,
  ScrollArea,
  Center,
} from "@mantine/core";

export type NavbarProps = React.PropsWithChildren<{
  icon?: React.ReactNode;
  title: React.ReactNode;
  action?: React.ReactNode;
  opened: boolean;
}>;

export const Navbar = (props: NavbarProps) => {
  const { title, icon, opened, children, action } = props;
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
      <Flex p="xs" fz="sm">
        <Center ml={4}>
          {icon}
          <Text ml={4}>{title}</Text>
        </Center>
        <span style={{ flex: 1 }} />
        {action}
      </Flex>
      <Divider />
      <ScrollArea w="100%" h="calc(100% - 42px)">
        {children}
      </ScrollArea>
    </MantineNavbar>
  );
};
