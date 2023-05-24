import React from "react";
import {
  AppShell as MantineAppShell,
  Header,
  Flex,
  Text,
  Center,
  MediaQuery,
} from "@mantine/core";
import { HumburgerButton, Logo, Navbar } from "..";

export type AppShellProps = React.PropsWithChildren<{
  title: React.ReactNode;
  navbar: {
    sections: {
      title: string;
      component: React.ReactNode;
    }[];
  };
}>;

export const AppShell = (props: AppShellProps) => {
  const { title, navbar, children } = props;
  const [opened, setOpened] = React.useState(false);
  return (
    <MantineAppShell
      header={
        <Header height={48} p="xs">
          <Flex gap="xs">
            <HumburgerButton
              opened={opened}
              onClick={() => setOpened((value) => !value)}
            />
            <Center sx={{ flex: 1 }}>
              <Logo />
              <Text ff="serif">{title}</Text>
            </Center>
            <MediaQuery largerThan="md" styles={{ display: "none" }}>
              <span style={{ width: 36 }} />
            </MediaQuery>
          </Flex>
        </Header>
      }
      navbar={<Navbar opened={opened} sections={navbar.sections} />}
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
