import { createStyles } from "@mantine/core";
import { BackgroundImage, Card, Text, Group } from "@mantine/core";

const useStyles = createStyles((theme, _params, getRef) => {
  return {
    card: {
      position: "relative",
      height: "100%",
      userSelect: "none",
      cursor: "pointer",
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
    image: {
      position: "absolute",
      width: "100%",
      height: "100%",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundSize: "cover",
    },

    overlay: {
      position: "absolute",
      top: "20%",
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage:
        "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)",
    },

    content: {
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      zIndex: 1,
    },

    title: {
      color: theme.white,
      marginBottom: 5,
    },

    bodyText: {
      color: theme.colors.dark[2],
      marginLeft: 7,
    },

    author: {
      color: theme.colors.dark[2],
    },
  };
});

type ThumbnailProps = {
  src: string;
  title: string;
  author: string;
  onClick?: () => void;
};

export function Thumbnail({ src, title, author, onClick }: ThumbnailProps) {
  const { classes } = useStyles();
  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="sm"
      component="a"
      target="_blank"
      h={200}
      onClick={onClick}
    >
      <BackgroundImage src={src} className={classes.image} />
      <div className={classes.overlay} />
      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} weight={500}>
            {title}
          </Text>

          <Group position="apart" spacing="xs">
            <Text size="sm" className={classes.author}>
              {author}
            </Text>
          </Group>
        </div>
      </div>
    </Card>
  );
}
