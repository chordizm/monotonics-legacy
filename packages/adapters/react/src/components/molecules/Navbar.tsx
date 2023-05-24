import { Navbar as MantineNavbar } from "@mantine/core";

export type NavbarProps = {
  opened?: boolean;
  sections: {
    title: string;
    component: React.ReactNode;
  }[];
};

export const Navbar = (props: NavbarProps) => {
  const { opened, sections } = props;
  return (
    <MantineNavbar
      hidden={!opened}
      hiddenBreakpoint="md"
      width={{ md: 300 }}
      sx={{
        height: "calc(100% - var(--mantine-header-height, 0px))",
        overflow: "auto",
      }}
    >
      {sections.map((section) => (
        <MantineNavbar.Section key={section.title}>
          {section.component}
        </MantineNavbar.Section>
      ))}
    </MantineNavbar>
  );
};
