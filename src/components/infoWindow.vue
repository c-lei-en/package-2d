// 加载信息窗口
<template>
  <button class="infoWindow" id="infoWindow" @click="infoWindowClick">
    加载信息窗口
  </button>
</template>

<script>
import infoWindow from "@/mapconfig/overlay/infoWindow";
export default {
  name: "infoWindow",
  props: {
    map: Object
  },
  watch: {
    map() {}
  },
  methods: {
    infoWindowClick() {
      let content = "<div>信息测试</div>";
      let infowindow = new infoWindow(content, {
        map: this.map,
        width: 300,
        height: 200,
        offset: [0, 0],
        autoPan: false,
        id: "istest"
      });
      infowindow.setPosition({ x: 104.08, y: 30.62 });
    }
  }
};
</script>

<style lang="scss" scoped>
.infoWindow {
  position: absolute;
  top: 5px;
  left: 10px;
  height: 30px;
  width: 120px;
  cursor: pointer;
  z-index: 1001;
}
</style>
