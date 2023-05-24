import { DatasetLink, DatasetLinks } from "@/components";

export default {
  title: "Components/DatasetLinks",
  component: DatasetLinks,
};

const links: DatasetLink[] = Array.from({ length: 10 }).map((_, i) => ({
  key: `item-${i}`,
  title: `Item ${i + 1}`,
  description: `Item ${i + 1} description`,
}));

export const Default = {
  args: {
    links,
  },
};
