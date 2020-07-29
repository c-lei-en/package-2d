// 创建缓冲区
<template>
  <div class="buffer" id="buffer">
    <a-button-group id="buttonGroup">
      <a-button
        type="primary"
        title="点缓冲区"
        class="pointBuffer"
        @click="bufferClick('Point')"
      ></a-button>
      <a-button
        type="primary"
        title="线缓冲区"
        class="lineBuffer"
        @click="bufferClick('LineString')"
      ></a-button>
    </a-button-group>
  </div>
</template>

<script>
import addLayer from "@/mapconfig/addlayer/addLayer";
import createSource from "@/mapconfig/addlayer/mapSource";
import { createMapInteraction } from "@/mapconfig/interaction/interaction";
import { createBuffer } from "@/mapconfig/controls/bufferControl";
import GeoJSON from "ol/format/GeoJSON";
export default {
  name: "buffer",
  props: {
    map: Object
  },
  data() {
    return {
      source: null,
      layer: null,
      draw: null
    };
  },
  mounted() {
    this.source = createSource("Vector");
    this.layer = addLayer("Vector", this.source);
  },
  methods: {
    bufferClick(type) {
      if (this.draw === null) {
        this.map.addLayer(this.layer);
      }
      if (this.draw !== null) {
        this.map.getInteractions().array_.length = 9;
        this.draw = null;
      }
      this.draw = createMapInteraction(this.source, type);
      this.map.addInteraction(this.draw);
      let format = new GeoJSON();
      // 引入画带箭头的线的功能
      this.map.getViewport().appendChild(document.getElementById("buffer"));
      this.draw.on("drawend", ev => {
        this.source.addFeature(
          format.readFeature(
            createBuffer(type, ev.feature.getGeometry().getCoordinates(), 200)
          )
        );

        this.$emit(
          "getFeature",
          this.source
            .getFeatures()
            [this.source.getFeatures().length - 1].getGeometry()
        );
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.buffer {
  position: absolute;
  top: 5px;
  left: 10px;
  height: 30px;
  width: 80px;
  cursor: pointer;
  z-index: 1001;
}
.pointBuffer {
  background: url("../assets/点缓冲区.png");
  background-color: white;
}
.lineBuffer {
  background: url("../assets/线缓冲区.png");
  background-color: white;
}
</style>
