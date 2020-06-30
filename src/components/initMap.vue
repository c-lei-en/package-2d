<template>
  <div id="map" style="height:100%;width:100%">
    <rotate :map="map"></rotate>
    <!-- <arrow-line :map="map"></arrow-line> -->
  </div>
</template>

<script>
import MapType from "@/mapconfig/core/MapType";
import addLayer from "@/mapconfig/addlayer/addLayer";
import createSource from "@/mapconfig/addlayer/mapSource";
import { Map, View } from "ol";
import { defaults /**ScaleLine*/ } from "ol/control";
import rotate from "./rotate";
// import arrowLine from "./arrowLine";
export default {
  name: "initMap",
  components: {
    rotate
    // arrowLine
  },
  props: {
    mapType: Array
  },
  data() {
    return {
      map: null
    };
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

    for (let i = 0, len = this.mapType.length; i < len; i++) {
      this.mapType[i] = addLayer(
        "Tile",
        createSource("XYZ", MapType[this.mapType[i]])
      );
      this.map.addLayer(this.mapType[i]);
    }
  },
  methods: {}
};
</script>

<style></style>
