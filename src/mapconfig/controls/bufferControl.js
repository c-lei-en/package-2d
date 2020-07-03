import buffer from "@turf/buffer";
import { point, lineString } from "@turf/helpers";

export function createBuffer(type, lonAndLat, radius) {
  let feature;
  switch (type) {
    case "Point":
      feature = point(lonAndLat);
      break;
    case "LineString":
      feature = lineString(lonAndLat);
      break;
    default:
      break;
  }
  return buffer(feature, radius, { units: "meters" });
}
