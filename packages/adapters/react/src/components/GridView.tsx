import { createStyles, SimpleGrid } from "@mantine/core";

import { Data, Identity } from "@monotonics/core";

const useStyles = createStyles((theme) => ({
  container: {
    overflow: "auto",
    height: "100%",
  },
  gridItem: {
    height: 240,
    [theme.fn.smallerThan(theme.breakpoints.sm)]: {
      height: "40vh",
    },
  },
}));

export type GridViewProps = React.PropsWithChildren<{}>;

export const GridView = (props: GridViewProps) => {
  const { classes } = useStyles();
  const { children } = props;
  return (
    <div className={classes.container}>
      <SimpleGrid
        p="sm"
        breakpoints={[
          { minWidth: "xs", cols: 1 },
          { minWidth: "sm", cols: 3 },
          { minWidth: "lg", cols: 4 },
          { minWidth: "xl", cols: 5 },
        ]}
      >
        {children}
      </SimpleGrid>
    </div>
  );
};
