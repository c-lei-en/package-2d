<template>
  <button class="arrowLine" id="arrowLine" @click="arrowLineClick">
    {{ isActive }}
  </button>
</template>

<script>
import addLayer from "@/mapconfig/addlayer/addLayer";
import createSource from "@/mapconfig/addlayer/mapSource";
import Draw from "ol/interaction/Draw";
export default {
  name: "arrowLine",
  props: {
    map: Object
  },
  data() {
    return {
      isActive: "画线",
      source: null,
      layer: null,
      draw: null
    };
  },
  mounted() {
    this.source = createSource("Vector");
    this.layer = addLayer("Vector", this.source);
    this.draw = new Draw({
      source: this.source,
      type: "LineString"
    });
  },
  methods: {
    arrowLineClick() {
      if (this.isActive == "画线") {
        this.map.addLayer(this.layer);
        this.map.addInteraction(this.draw);

        // 引入画带箭头的线的功能
        this.map
          .getViewport()
          .appendChild(document.getElementById("arrowLine"));
      } else {
        this.source.clear();
        this.map.removeLayer(this.layer);
        this.map.removeInteraction(this.draw);
      }
      this.isActive = this.isActive === "画线" ? "取消" : "画线";
    }
  }
};
</script>

<style lang="scss" scoped>
.arrowLine {
  position: absolute;
  top: 5px;
  left: 10px;
  height: 20px;
  width: 60px;
  cursor: pointer;
  z-index: 1001;
}
</style>
