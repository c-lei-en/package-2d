<template>
  <div id="map" style="height:100%;width:100%">
    <rotate :map="map"></rotate>
    <!-- 绘制带箭头的线 -->
    <!-- <arrow-line :map="map"></arrow-line> -->
    <!-- 控制地图显隐 -->
    <!-- <convert-map :dtmapNameList="mapList"></convert-map> -->
    <!-- 测量 -->
    <!-- <measure :map="map"></measure> -->
    <!-- 创建缓冲区 -->
    <!-- <buffer :map="map"></buffer> -->
    <!-- 卷帘效果 -->
    <!-- <swipe :map="map" :layer="swipeLayer"></swipe> -->
    <!-- 聚合图层 -->
    <!-- <cluter-layer :map="map"></cluter-layer> -->
  </div>
</template>

<script>
import MapType from "@/mapconfig/core/MapType";
import addLayer from "@/mapconfig/addlayer/addLayer";
import createSource from "@/mapconfig/addlayer/mapSource";
import { Map, View } from "ol";
import { defaults /**ScaleLine*/ } from "ol/control";
import rotate from "./rotate";
// import measure from "./measure";
// import arrowLine from "./arrowLine";
// import convertMap from "./convertMap";
// import buffer from "./buffer";
// import swipe from "./swipe";
// import cluterLayer from "./cluterLayer";
export default {
  name: "initMap",
  components: {
    rotate
    // cluterLayer
    // swipe
    // buffer
    // measure
    // convertMap
    // arrowLine
  },
  props: {
    mapType: Array
  },
  data() {
    return {
      map: null,
      mapList: [],
      swipeLayer: null
    };
  },
  watch: {
    mapType() {
      for (let i = 0, len = this.mapType.length; i < len; i++) {
        this.mapList.push({
          name: this.mapType[i].name,
          value: addLayer(
            "Tile",
            createSource("XYZ", MapType[this.mapType[i].name])
          )
        });
        this.mapList[i].value.setVisible(this.mapType[i].visible);
        this.map.addLayer(this.mapList[i].value);
      }
      this.swipeLayer = this.mapList[1].value;
    }
  },
  mounted() {
    let view = new View({
      center: [104.08, 30.62],
      minZoom: 1,
      maxZoom: 21,
      zoom: 7,
      projection: "EPSG:4326"
    });
    this.map = new Map({
      target: "map",
      view: view,
      loadTilesWhileAnimating: true,
      controls: defaults({
        zoom: false,
        rotate: false
      })
    });
    // let scale = new ScaleLine();
    // this.map.addControl(scale);
  },
  methods: {}
};
</script>

<style></style>
