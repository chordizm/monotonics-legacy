import { Accordion } from "@/components";

export default {
  title: "Components/Accorditon",
  component: Accordion,
};

export const Default = {
  args: {
    opened: true,
    title: "Accordion Title",
    children: [<h1>1</h1>, <h1>2</h1>],
  },
};
