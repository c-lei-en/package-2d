<template>
  <div class="swipe">
    卷帘:<input
      type="range"
      min="0"
      max="100"
      step="1"
      id="swipe"
      value="50"
    /><br />
  </div>
</template>

<script>
import { getRenderPixel } from "ol/render";
export default {
  name: "swipe",
  props: {
    map: Object,
    layer: Object
  },
  watch: {
    layer() {
      let swipe = document.getElementById("swipe");
      this.layer.on("prerender", event => {
        let ctx = event.context;
        let mapSize = this.map.getSize();

        let width = mapSize[0] * (swipe.value / 100);
        let tl = getRenderPixel(event, [width, 0]);
        let tr = getRenderPixel(event, [mapSize[0], 0]);
        let bl = getRenderPixel(event, [width, mapSize[1]]);
        let br = getRenderPixel(event, mapSize);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tl[0], tl[1]);
        ctx.lineTo(bl[0], bl[1]);
        ctx.lineTo(br[0], br[1]);
        ctx.lineTo(tr[0], tr[1]);
        ctx.closePath();
        ctx.clip();
      });
      this.layer.on("postrender", event => {
        let ctx = event.context;
        ctx.restore();
      });
      swipe.addEventListener(
        "input",
        () => {
          this.map.render();
        },
        false
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.swipe {
  position: absolute;
  top: 15px;
  left: 40px;
  color: white;
  z-index: 9;
  width: auto;
}
.swipe input[type="range"] {
  width: 300px;
}
</style>
