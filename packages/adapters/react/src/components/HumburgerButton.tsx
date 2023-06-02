import { Center, MediaQuery, Burger, useMantineTheme } from "@mantine/core";

export type HumburgerButtonProps = {
  opened?: boolean;
  onClick?: () => void;
};

export const HumburgerButton = (props: HumburgerButtonProps) => {
  const { opened, onClick } = props;
  const theme = useMantineTheme();
  return (
    <Center>
      <MediaQuery largerThan="md" styles={{ display: "none" }}>
        <Burger
          opened={opened ?? false}
          onClick={onClick}
          size="xs"
          color={theme.colors.gray[6]}
        />
      </MediaQuery>
    </Center>
  );
};
