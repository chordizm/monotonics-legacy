import React, { useMemo, useEffect, useState, useRef } from "react";
import {
  Navbar as MantineNavbar,
  Text,
  Flex,
  Divider,
  ScrollArea,
  Center,
  ActionIcon,
} from "@mantine/core";
import { IconDatabase, IconPlus } from "@tabler/icons-react";

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
        {children}
      </ScrollArea>
    </MantineNavbar>
  );
};
