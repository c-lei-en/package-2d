// 热力图
<template>
  <button class="heatMapLayer" id="heatMapLayer" @click="heatmapClick">
    添加热力图
  </button>
</template>

<script>
import addLayer from "@/mapconfig/addlayer/addLayer";
import createSource from "@/mapconfig/addlayer/mapSource";
export default {
  name: "heatMapLayer",
  props: {
    map: Object
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
      "http://localhost:8519/geoserver/postgis/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=postgis:mulline_vertices_pgr&maxFeatures=50&outputFormat=application%2Fjson&srsname=EPSG:4326"
    );
    this.layer = addLayer("heatMap", this.source);
  },
  methods: {
    heatmapClick() {
      this.map.addLayer(this.layer);
    }
  }
};
</script>

<style lang="scss" scoped>
.heatMapLayer {
  position: absolute;
  top: 5px;
  left: 10px;
  height: 30px;
  width: 120px;
  cursor: pointer;
  z-index: 1001;
}
</style>
