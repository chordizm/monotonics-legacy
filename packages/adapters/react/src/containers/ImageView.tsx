import {
  useSelectedItemIndex,
  useColors,
  useSelectedData,
  useUrlResolver,
} from "@/store";
import { getViewBox } from "@/utils";
import { Image } from "@/components";
import { Point } from "@monotonics/core";

export const ImageView = (_: {}) => {
  const [data] = useSelectedData();
  const [selectedIndex, setSelectedIndex] = useSelectedItemIndex();
  const [colors] = useColors();
  const resolver = useUrlResolver();
  return data ? (
    <Image
      src={resolver.getUrl(data.id)}
      colors={colors}
      data={data}
      selectedIndex={selectedIndex}
      viewBox={
        selectedIndex !== undefined
          ? getViewBox(data.items[selectedIndex].points as Point[])
          : undefined
      }
      onClick={(index) => setSelectedIndex(index)}
    />
  ) : (
    <></>
  );
};
