// 空间查询
<template>
  <button class="querySpatial" id="querySpatial" @click="querySpatialClick">
    空间查询
  </button>
</template>

<script>
import createSource from "@/mapconfig/addlayer/mapSource";
import addLayer from "@/mapconfig/addlayer/addLayer";
import { querySpatial } from "@/mapconfig/query/querySpatial";
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
    }
  },
  data() {
    return {
      source: null,
      layer: null,
      arrList: null
    };
  },
  mounted() {
    this.source = createSource(
      "Wfs",
      "http://localhost:8519/geoserver/cite/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=cite:point&maxFeatures=50&outputFormat=application%2Fjson&srsname=EPSG:4326"
    );
    this.layer = addLayer("Vector", this.source);
  },
  methods: {
    querySpatialClick() {
      querySpatial(
        "http://www.opengeospatial.net/cite",
        "cite",
        ["point"],
        this.geom,
        "http://localhost:8519/geoserver/cite/wfs"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.querySpatial {
  position: absolute;
  top: 5px;
  left: 140px;
  height: 30px;
  width: 120px;
  cursor: pointer;
  z-index: 1001;
}
</style>
