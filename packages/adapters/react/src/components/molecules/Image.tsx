import React, { useState } from "react";
import { Point, Data } from "@monotonics/core";
import { ActionIcon } from "@mantine/core";
import { IconWindowMaximize } from "@tabler/icons-react";

export type PolygonProps = {
  selected?: boolean;
  points: Point[];
  stroke?: string;
  fill?: string;
  onClick?: () => void;
};
export const Polygon = (props: PolygonProps): JSX.Element => {
  const { selected, points, stroke, fill, onClick } = props;
  return (
    <polygon
      fill={fill ?? "rgba(206, 55, 47, 0.2)"}
      stroke={stroke ?? "rgb(206, 55, 47)"}
      strokeWidth={selected ? 2 : 1}
      points={points.map((p) => `${p.x},${p.y}`).join(" ")}
      cursor="pointer"
      onClick={onClick}
    />
  );
};

export type ImageProps = Omit<React.SVGProps<SVGSVGElement>, "onClick"> & {
  src: string;
  data: Omit<Data, "raw">;
  colors: Record<string, string>;
  selectedIndex?: number;
  onClick?: (index: number | undefined) => void;
};

export const Image = (props: ImageProps): JSX.Element => {
  const {
    src,
    data,
    selectedIndex,
    onClick,
    onLoad,
    viewBox: defaultViewBox,
    colors,
    ...svgProps
  } = props;
  const [viewBox, setViewBox] = useState(defaultViewBox);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <svg
        {...svgProps}
        style={{
          background: "black",
          ...svgProps.style,
          width: "100%",
          height: "100%",
          userSelect: "none",
        }}
        viewBox={defaultViewBox ?? viewBox ?? "0 0 0 0"}
      >
        <image
          href={src}
          onLoad={(e) => {
            const image = e.target as SVGImageElement;
            const box = image.getBBox();
            setViewBox(`0 0 ${box.width} ${box.height}`);
          }}
        />
        {data.items.map(({ points, labels }, index) =>
          selectedIndex === undefined || selectedIndex === index ? (
            <Polygon
              key={`segment-${index}`}
              selected={selectedIndex === index}
              points={(points ?? []) as Point[]}
              fill="#FFFFFF01"
              stroke={colors[labels.sort().join("-")]}
              onClick={() => onClick?.(index)}
            />
          ) : (
            <></>
          )
        )}
      </svg>
      {selectedIndex !== undefined && (
        <ActionIcon
          variant="filled"
          style={{ position: "absolute", top: "1rem", right: "1rem" }}
          onClick={() => onClick?.(undefined)}
        >
          <IconWindowMaximize size={24} />
        </ActionIcon>
      )}
    </div>
  );
};
