// 点击查询
<template>
  <button class="heatMapLayer" id="heatMapLayer" @click="heatmapClick">
    添加点击查询
  </button>
</template>

<script>
import addLayer from "@/mapconfig/addlayer/addLayer";
import createSource from "@/mapconfig/addlayer/mapSource";
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
    this.source = createSource(
      "Wfs",
      "http://localhost:8519/geoserver/postgis/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=postgis:mulline_vertices_pgr&maxFeatures=50&outputFormat=application%2Fjson&srsname=EPSG:4326"
    );
    this.layer = addLayer("Vector", this.source);
  },
  methods: {
    heatmapClick() {
      this.map.addLayer(this.layer);
      this.map.on("singleclick", e => {
        let pixel = this.map.getEventPixel(e.originalEvent);
        let feature = this.map.forEachFeatureAtPixel(pixel, function(feature) {
          return feature;
        });
        if (feature != undefined) {
          console.log(feature);
        }
      });

      // wms服务的点击查询
      //   this.map.on("singleclick", evt => {
      //   let viewResolution = this.map.getView().getResolution();
      //   let url = this.source.getFeatureInfoUrl(
      //     evt.coordinate,
      //     viewResolution,
      //     "EPSG:4326",
      //     { INFO_FORMAT: "application/json" }
      //   );
      //   if (url) {
      //     axios.get(url).then(response => {
      //       console.log(response.data);
      //     });
      //   }
      // });
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
