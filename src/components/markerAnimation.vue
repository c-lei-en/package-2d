// 小车动画
<template>
  <div class="markerAnimation">
    <label for="speed">
      speed:&nbsp;
      <input
        id="speed"
        type="range"
        min="10"
        max="999"
        step="10"
        :value="speedValue"
      />
    </label>
    <a-button-group id="buttonGroup">
      <a-button
        type="primary"
        icon="play-circle"
        title="开始动画"
        @click="startAnimation"
      ></a-button>
      <a-button
        type="primary"
        icon="pause"
        title="结束动画"
        @click="stopAnimation"
      ></a-button>
    </a-button-group>
  </div>
</template>

<script>
import markerAnimation from "@/mapconfig/animation/markerAnimation";
export default {
  name: "markerAnimation",
  props: {
    map: Object,
    animationList: Array
  },
  watch: {
    animationList() {
      this.markerClass = new markerAnimation(
        this.map,
        this.animationList[0],
        this.animationList[1],
        this.speedValue
      );
    }
  },
  data() {
    return {
      markerClass: null,
      speedValue: 60
    };
  },
  methods: {
    startAnimation() {
      this.markerClass.startAnimation();
    },
    stopAnimation() {
      this.markerClass.stopAnimation();
    }
  }
};
</script>

<style lang="scss" scoped>
.markerAnimation {
  position: absolute;
  top: 5px;
  left: 90px;
  height: 30px;
  width: 247px;
  cursor: pointer;
  z-index: 1001;
}
</style>
