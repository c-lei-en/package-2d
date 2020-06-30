<template>
  <div class=" change-tab">
    <span class="divider-title">底图</span>
    <a-radio-group @change="onDtChange" class="self-radio" v-model="defaultMap">
      <a-radio
        class="self-radio-item"
        v-for="(item, index) of dtmapNameList"
        :key="index"
        :value="index"
        >{{ item.name }}</a-radio
      >
    </a-radio-group>
  </div>
</template>

<script>
export default {
  name: "convertMap",
  props: {
    dtmapNameList: Array
  },
  data() {
    return {
      defaultMap: null
    };
  },
  watch: {
    dtmapNameList() {
      for (let i = 0; i < this.dtmapNameList.length; i++) {
        if (this.dtmapNameList[i].value.getVisible()) {
          this.defaultMap = i;
        }
      }
    }
  },
  methods: {
    onDtChange(e) {
      let index = e.target.value;
      for (let i = 0; i < this.dtmapNameList.length; i++) {
        this.dtmapNameList[i].value.setVisible(false);
        if (i === index) {
          this.dtmapNameList[i].value.setVisible(true);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.change-tab {
  position: absolute;
  z-index: 1001;
  border-radius: $borderRadius;
  width: 100%;
  font-size: $font-sm;
  @include flex-box(row, space-between, center);
}
</style>
