import { getColors, getViewBox } from "../utils";
import { Image } from "../components";
import { Data, Point } from "@monotonics/core";

export type ImageViewProps = {
  data: Data;
  path: string;
  selectedIndex?: number;
  onChange?: (selectedIndex?: number) => void;
};

export const ImageView = ({
  data,
  path,
  selectedIndex,
  onChange,
}: ImageViewProps) => {
  const colors = getColors(data);
  return data ? (
    <Image
      src={path}
      colors={colors}
      data={data}
      selectedIndex={selectedIndex}
      viewBox={
        selectedIndex !== undefined
          ? getViewBox(data.items[selectedIndex].points as Point[])
          : undefined
      }
      onClick={(index) => onChange?.(index)}
    />
  ) : (
    <></>
  );
};
