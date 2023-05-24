import { Point } from "@monotonics/core";

export const getViewBox = (points: Point[]): string => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;

  for (const point of points) {
    minX = Math.min(minX, point.x);
    minY = Math.min(minY, point.y);
    maxX = Math.max(maxX, point.x);
    maxY = Math.max(maxY, point.y);
  }

  //   return {
  //     left: minX,
  //     top: minY,
  //     width: maxX - minX,
  //     height: maxY - minY,
  //   };
  return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`;
};
