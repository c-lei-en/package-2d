// 加载迁徙图
<template>
  <button class="migration" id="migration" @click="migrationClick">
    添加迁徙图
  </button>
</template>

<script>
import migration from "@/mapconfig/echartsMigration/migration";
import testData from "@/mapconfig/echartsMigration/testData";
export default {
  name: "migration",
  props: {
    map: Object
  },
  watch: {
    map() {}
  },
  methods: {
    migrationClick() {
      let oe = new migration(testData.option, this.map, this.$echarts);
      oe.render();
      this.map.render();
    }
  }
};
</script>

<style lang="scss" scoped>
.migration {
  position: absolute;
  top: 5px;
  left: 10px;
  height: 30px;
  width: 120px;
  cursor: pointer;
  z-index: 1001;
}
</style>
