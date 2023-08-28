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
  selectedIndex,
  onChange,
}: ImageViewProps) => {
  const colors = getColors(data);
  return data ? (
    <Image
      src={`data:${data.mimeType};base64,${data.raw}`}
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
