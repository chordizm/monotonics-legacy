import { Image } from "../../components";

export default {
  title: "Components/Image",
  component: Image,
};

export const Default = {
  args: {
    width: "100%",
    height: "100%",
    src: `/sample.jpg`,
    colors: {
      "label-1": "#ff0000",
      "label-2": "#00ff00",
    },
    data: {
      items: [
        {
          name: "item-1",
          labels: ["label-1"],
          points: [
            { x: 100, y: 100 },
            { x: 200, y: 100 },
            { x: 200, y: 200 },
          ],
        },
        {
          name: "item-2",
          labels: ["label-2"],
          points: [
            { x: 100, y: 100 },
            { x: 100, y: 200 },
            { x: 200, y: 200 },
          ],
        },
      ],
    },
  },
};
