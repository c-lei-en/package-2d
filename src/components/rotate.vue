// 地图旋转组件
<template>
  <div class="rotate-control-custom">
    <button
      class="right2d-button-custom"
      @click="rotateClick('right', 90)"
    ></button>
    <button
      class="left2d-button-custom"
      @click="rotateClick('left', -90)"
    ></button>
    <button
      class="center2d-button-custom"
      @click="rotateClick('center', 0)"
    ></button>
  </div>
</template>

<script>
import rotationView from "@/mapconfig/controls/RotateControl";
export default {
  name: "rotate",
  props: {
    map: Object
  },
  methods: {
    rotateClick(type, rotation) {
      let button = document.getElementsByClassName("center2d-button-custom")[0];
      rotationView(button, rotation, type, this.map);
    }
  }
};
</script>

<style></style>
