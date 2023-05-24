import React, { useState } from "react";
import { Segment } from "@monotonics/core";
import { ActionIcon } from "@mantine/core";
import { IconWindowMaximize } from "@tabler/icons-react";

export type PolygonProps = Omit<
  React.SVGProps<SVGPolygonElement>,
  "onClick"
> & { selected?: boolean; segment: Segment; onClick?: () => void };
export const Polygon = (props: PolygonProps): JSX.Element => {
  const { selected, segment, onClick, ...svgProps } = props;
  return (
    <polygon
      {...svgProps}
      fill="#FFFFFF01"
      stroke="rgb(206, 55, 47)"
      strokeWidth={selected ? 2 : 1}
      points={segment.points.map((p) => `${p.x},${p.y}`).join(" ")}
      cursor="pointer"
      onClick={onClick}
    />
  );
};

export type ImageProps = Omit<React.SVGProps<SVGSVGElement>, "onClick"> & {
  src: string;
  segments: Segment[];
  selectedIndex?: number;
  onClick?: (index: number | undefined) => void;
};

export const Image = (props: ImageProps): JSX.Element => {
  const {
    src,
    segments,
    selectedIndex,
    onClick,
    onLoad,
    viewBox: defaultViewBox,
    children,
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
        {segments.map((segment, index) =>
          selectedIndex === undefined || selectedIndex === index ? (
            <Polygon
              key={`segment-${index}`}
              selected={selectedIndex === index}
              segment={segment}
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
