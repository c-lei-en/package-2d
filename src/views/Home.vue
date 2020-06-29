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
      mapNameList: ["SATELLITE_GOOGLE"]
    };
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
