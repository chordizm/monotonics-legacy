import { createStyles, SimpleGrid } from "@mantine/core";
import { ImageCard } from "./ImageCard";
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

export type ImagesViewProps = {
  data: Omit<Data, "raw" | "params">[];
  resolveUrl: (id: Identity) => string;
  onClick?: (i: number) => void;
};

export const ImagesView = (props: ImagesViewProps) => {
  const { classes } = useStyles();
  const { data, resolveUrl, onClick } = props;
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
        {data.map(({ id, name, date }, i) => (
          <div key={`images-${i}`} className={classes.gridItem}>
            <ImageCard
              title={name}
              author={date.toLocaleString()}
              src={resolveUrl(id)}
              onClick={() => {
                onClick?.(i);
              }}
            />
          </div>
        ))}
      </SimpleGrid>
    </div>
  );
};
