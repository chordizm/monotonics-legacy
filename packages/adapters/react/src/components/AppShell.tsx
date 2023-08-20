import React, { useEffect } from "react";
import {
  AppShell as MantineAppShell,
  Header,
  Flex,
  Text,
  Center,
  Box,
} from "@mantine/core";
import { HumburgerButton, Logo, Navbar, useSelectedDatasetId } from "..";

export type AppShellProps = React.PropsWithChildren<{
  navbar: {
    icon: React.ReactNode;
    action: React.ReactNode;
    title: string;
    content: React.ReactNode;
  };
}>;

export const AppShell = (props: AppShellProps) => {
  const { navbar, children } = props;
  const [opened, setOpened] = React.useState(false);
  const [datasetId] = useSelectedDatasetId();
  useEffect(() => {
    if (datasetId) {
      setOpened(false);
    }
  }, [datasetId]);
  return (
    <MantineAppShell
      header={
        <Header height={32} p={4}>
          <Flex gap="xs">
            <HumburgerButton
              opened={opened}
              onClick={() => setOpened((value) => !value)}
            />

            <Center sx={{ flex: 1 }}>
              <Logo />
              <Text fz="xs" ff="serif" sx={{ userSelect: "none" }}>
                MonoTonics
              </Text>
            </Center>

            <Box
              sx={(theme) => ({
                [theme.fn.largerThan("md")]: {
                  height: 22,
                  width: 0,
                },
                width: 36,
              })}
            ></Box>
          </Flex>
        </Header>
      }
      navbar={
        <Navbar
          title={navbar.title}
          icon={navbar.icon}
          action={navbar.action}
          opened={opened}
        >
          {navbar.content}
        </Navbar>
      }
      sx={() => ({
        main: {
          paddingTop: "calc(var(--mantine-header-height, 0px))",
          paddingBottom: "calc(var(--mantine-footer-height, 0px))",
          paddingLeft: "calc(var(--mantine-navbar-width, 0px))",
          paddingRight: "calc(var(--mantine-aside-width, 0px))",
          height:
            "calc(100vh - var(--mantine-header-height, 0px) - var(--mantine-footer-height, 0px))",
          overflow: "auto",
        },
      })}
    >
      {children}
    </MantineAppShell>
  );
};
