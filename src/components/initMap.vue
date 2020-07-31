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
    <!-- <buffer :map="map" @getFeature="getFeature"></buffer> -->
    <!-- 卷帘效果 -->
    <!-- <swipe :map="map" :layer="swipeLayer"></swipe> -->
    <!-- 聚合图层 -->
    <!-- <cluter-layer :map="map"></cluter-layer> -->
    <!-- 热力图 -->
    <!-- <heat-map :map="map"></heat-map> -->
    <!-- 点击查询 -->
    <!-- <query-click :map="map"></query-click> -->
    <!-- 空间查询 -->
    <!-- <query-spatial :map="map" :geom="geom"></query-spatial> -->
    <!-- 根据坐标构建要素的缓冲区查询 -->
    <!-- <vector-query :map="map" :geom="geom"></vector-query> -->
    <!-- 添加迁徙图 -->
    <!-- <migration-map :map="map"></migration-map> -->
    <!-- 信息窗体 -->
    <!-- <info-window :map="map"></info-window> -->
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
// import heatMap from "./heatMap";
// import queryClick from "./queryClick";
// import querySpatial from "./querySpatial";
// import vectorQuery from "./vectorQuery";
// import migrationMap from "./migrationMap";
// import infoWindow from "./infoWindow";
export default {
  name: "initMap",
  components: {
    // querySpatial,
    // queryClick,
    // heatMap,
    // cluterLayer,
    // swipe,
    // buffer,
    // vectorQuery,
    // measure,
    // convertMap,
    // arrowLine,
    // migrationMap,
    // infoWindow,
    rotate
  },
  props: {
    mapType: Array
  },
  data() {
    return {
      map: null,
      mapList: [],
      swipeLayer: null,
      geom: null
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
  methods: {
    getFeature(geom) {
      this.geom = geom;
    }
  }
};
</script>

<style></style>
