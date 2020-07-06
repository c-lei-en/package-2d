<template>
  <div class="home">
    <init-map class="home" :mapType="mapNameList"></init-map>
  </div>
</template>

<script>
// @ is an alias to /src
import initMap from "@/components/initMap";

export default {
  name: "Home",
  components: { initMap },
  data() {
    return {
      mapNameList: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.mapNameList = [
        { name: "谷歌卫星地图", visible: true },
        { name: "蓝黑色矢量地图", visible: false }
      ];
    });
  }
};
</script>
<style lang="scss">
.home {
  width: 100%;
  height: 100vh;
  position: relative;
  .map {
    height: 100%;
  }
}
</style>
