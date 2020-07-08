// 根据坐标构建要素查询
<template>
  <button class="vectorQuery" id="vectorQuery" @click="vectorQuery">
    要素查询
  </button>
</template>

<script>
import createSource from "@/mapconfig/addlayer/mapSource";
import { featureCollection } from "@/mapconfig/addlayer/featureCollection";
import addLayer from "@/mapconfig/addlayer/addLayer";
import Intersections from "@/mapconfig/intersections/intersections";
import { PointArr, Point } from "@/mapconfig/math/point";
export default {
  name: "querySpatial",
  props: {
    map: Object,
    geom: Object
  },
  watch: {
    map() {
      this.map.addLayer(this.layer);
      this.layer.setZIndex(10);
    },
    geom() {
      this.geomCoordinate = PointArr(this.geom.flatCoordinates);
    }
  },
  data() {
    return {
      source: null,
      layer: null,
      geomCoordinate: null,
      featureArr: []
    };
  },
  mounted() {
    let count = 2000;
    this.arrList = new Array(count);
    for (let i = 0; i < count; i++) {
      this.arrList[i] = {
        lon: 1 + Math.round(Math.random() * 9) + Math.random(),
        lat: 1 + Math.round(Math.random() * 9) + Math.random()
      };
    }
    this.source = createSource("Vector");
    this.source.addFeatures(featureCollection(this.arrList, "EPSG:4326", 1));
    this.layer = addLayer("Vector", this.source);
  },
  methods: {
    vectorQuery() {
      this.source.forEachFeatureIntersectingExtent(
        this.geom.getExtent(),
        feature => {
          let point = new Point(feature.getGeometry().flatCoordinates);
          let bool = Intersections.withinPolygon(this.geomCoordinate, point);
          if (bool) {
            this.featureArr.push(feature);
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.vectorQuery {
  position: absolute;
  top: 5px;
  left: 140px;
  height: 30px;
  width: 120px;
  cursor: pointer;
  z-index: 1001;
}
</style>
