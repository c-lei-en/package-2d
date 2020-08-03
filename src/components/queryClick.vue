// 点击查询
<template>
  <button class="queryClick" id="queryClick" @click="queryClick">
    添加点击查询
  </button>
</template>

<script>
import addLayer from "@/mapconfig/addlayer/addLayer";
import createSource from "@/mapconfig/addlayer/mapSource";
import { featureClicked } from "@/mapconfig/query/queryClick";
export default {
  name: "queryClick",
  props: {
    map: Object
  },
  watch: {
    map() {
      this.map.on("singleclick", ev => {
        console.log(featureClicked("Wfs", this.map, ev));
      });
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
      "http://localhost:8519/geoserver/postgis/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=postgis:mulline_vertices_pgr&maxFeatures=50&outputFormat=application%2Fjson&srsname=EPSG:4326"
    );
    this.layer = addLayer("Vector", this.source);
  },
  methods: {
    queryClick() {
      this.map.addLayer(this.layer);
    }
  }
};
</script>

<style lang="scss" scoped>
.queryClick {
  position: absolute;
  top: 5px;
  left: 10px;
  height: 30px;
  width: 120px;
  cursor: pointer;
  z-index: 1001;
}
</style>
