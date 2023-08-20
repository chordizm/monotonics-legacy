import {
  useSelectedItemIndex,
  useColors,
  useSelectedData,
  useSelectedDataUrl,
} from "../hooks";
import { getViewBox } from "../utils";
import { Image } from "../components";
import { Point } from "@monotonics/core";

export const ImageView = (_: {}) => {
  const [data] = useSelectedData();
  const [selectedIndex, setSelectedIndex] = useSelectedItemIndex();
  const [colors] = useColors();
  const [dataUrl] = useSelectedDataUrl();
  return data && dataUrl ? (
    <Image
      src={dataUrl}
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
