import { NavLink as MantineNavLink } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

export type NavLinkProps = {
  active?: boolean;
  label: string;
  description: string;
  onClick?: () => void;
};

export const NavLink = (props: NavLinkProps) => {
  const { active, label, description, onClick } = props;
  return (
    <MantineNavLink
      active={active}
      label={label}
      description={description}
      rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
      onClick={onClick}
    />
  );
};
