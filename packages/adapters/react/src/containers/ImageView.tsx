import { getColors, getViewBox } from "../utils";
import { Image } from "../components";
import { Data, Point } from "@monotonics/core";

export type ImageViewProps = {
  dataUrl: string;
  data: Data;
  selectedIndex?: number;
  onChange?: (selectedIndex?: number) => void;
};

export const ImageView = ({
  data,
  dataUrl,
  selectedIndex,
  onChange,
}: ImageViewProps) => {
  const colors = getColors(data);
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
      onClick={(index) => onChange?.(index)}
    />
  ) : (
    <></>
  );
};
