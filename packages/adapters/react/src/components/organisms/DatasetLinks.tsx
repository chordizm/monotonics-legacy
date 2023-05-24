import { Box, NavLink } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";

export type DatasetLink = {
  key: string;
  title: string;
  description: string;
};

export type DatasetLinksProps = {
  activeKey?: string;
  links: DatasetLink[];
  onClick?: (key: string) => void;
};

export const DatasetLinks = (props: DatasetLinksProps) => {
  const { activeKey, links, onClick } = props;
  return (
    <Box>
      {links.map((link) => (
        <NavLink
          active={activeKey === link.key}
          key={link.key}
          label={link.title}
          description={link.description}
          rightSection={<IconChevronRight size="1rem" stroke={1.5} />}
          onClick={() => onClick?.(link.key)}
        />
      ))}
    </Box>
  );
};
