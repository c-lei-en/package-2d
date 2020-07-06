import { Point } from "ol/geom";
import Feature from "ol/Feature";
import { fromLonLat } from "ol/proj";
import { createSrcAndColor, createFeatureStyle } from "./mapStyle";

/**
 * 创建要素集合
 * @export
 * @param {*} arrList 坐标集合 格式为[{}]
 * @param {string} [projection="EPSG:4326"] 指定坐标系统，默认为WGS84
 * @returns
 */
export function featureCollection(arrList, projection = "EPSG:4326") {
  let romeArr = [];
  for (let i = 0, len = arrList.length; i < len; i++) {
    let point = new Feature({
      geometry: new Point(
        new fromLonLat([arrList[i].lon, arrList[i].lat], projection)
      )
      // name: arrList[i].name
    });
    let srcAndColor = createSrcAndColor(arrList[i].level, arrList[i].type);
    point.setStyle(
      createFeatureStyle(srcAndColor.src, srcAndColor.color, arrList[i].name)
    );
    romeArr.push(point);
  }
  return romeArr;
}
