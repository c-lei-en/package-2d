import { Fill, Circle, Style, Text, Icon } from "ol/style";
let padding = [3, 3, 3, 3];
/**
 * 创建WFS要素样式
 * @param {*} feature 要素
 * @returns
 */
export function createStyle(feature) {
  return new Style({
    image: new Circle({
      radius: 0
    }),
    text: new Text({
      text: feature.get("name"),
      offsetX: 20,
      offsetY: -20,
      textAlign: "left",
      fill: new Fill({
        color: "white"
      }),
      backgroundFill: new Fill({
        color: feature.get("color")
      }),
      padding: padding
    })
  });
}

/**
 * 动态创建样式所需的图片地址与标注颜色
 * @param {number} [level=0]
 * @param {string} [type='07']
 * @returns {Property} { src , color }
 */
export function createSrcAndColor(level = 0, type = "07") {
  let src, color;
  src = type + "-" + level;
  switch (level) {
    case 0:
      color = "green";
      break;
    case 1:
      color = "blue";
      break;
    case 2:
      color = "orange";
      break;
    case 3:
      color = "red";
      break;
    default:
      break;
  }
  return {
    src: src,
    color: color
  };
}

/**
 * 创建要素样式
 * @param {string} src 图片地址
 * @param {string} color 标注颜色
 * @param {string} featureName 要素名称
 * @param {string} [position="left"] 标注显示在哪个位置，可选值有'left','right','center','end','start',默认值为'left'
 * @returns {Style} style 要素样式
 */
export function createFeatureStyle(src, color, featureName, position = "left") {
  return new Style({
    image: new Icon({
      scale: 1,
      anchor: [0.5, 1],
      src: src
    }),
    text: new Text({
      text: featureName,
      textAlign: position,
      offsetX: 20,
      offsetY: -20,
      fill: new Fill({
        color: "white"
      }),
      backgroundFill: new Fill({
        color: color
      }),
      padding: padding
    })
  });
}
