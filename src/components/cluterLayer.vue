// 聚合图层
<template>
  <button class="cluterLayer" id="cluterLayer" @click="cluterClick">
    添加聚合图层
  </button>
</template>

<script>
import addLayer from "@/mapconfig/addlayer/addLayer";
import { featureCollection } from "@/mapconfig/addlayer/featureCollection";
import createSource from "@/mapconfig/addlayer/mapSource";
import { createCluterSource } from "@/mapconfig/clusterDataSource/clusterDataSource";
export default {
  name: "arrowLine",
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
    let count = 2000;
    this.arrList = new Array(count);
    for (let i = 0; i < count; i++) {
      this.arrList[i] = {
        lon: 1 + Math.round(Math.random() * 9) + Math.random(),
        lat: 1 + Math.round(Math.random() * 9) + Math.random()
      };
    }
    let vecSource = createSource("Vector");
    vecSource.addFeatures(featureCollection(this.arrList, "EPSG:4326", 1));
    this.source = createCluterSource(vecSource);
    this.layer = addLayer("cluterVector", this.source);
  },
  methods: {
    cluterClick() {
      this.map.addLayer(this.layer);
    }
  }
};
</script>

<style lang="scss" scoped>
.cluterLayer {
  position: absolute;
  top: 5px;
  left: 10px;
  height: 30px;
  width: 120px;
  cursor: pointer;
  z-index: 1001;
}
</style>
