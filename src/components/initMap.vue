<template>
  <div id="map" style="height:100%;width:100%"></div>
</template>

<script>
import MapType from "@/mapconfig/core/MapType";
import addLayer from "@/mapconfig/addLayer/addLayer";
import createSource from "@/mapconfig/addLayer/mapSource";
import "ol/ol.css";
import { Map, View } from "ol";
export default {
  name: "initMap",
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
      loadTilesWhileAnimating: true
    });
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

<style>
</style>
