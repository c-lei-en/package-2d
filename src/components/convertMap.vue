<template>
  <div class=" change-tab">
    <span class="divider-title">底图</span>
    <a-radio-group @change="onDtChange" class="self-radio" v-model="defaultMap">
      <a-radio
        class="self-radio-item"
        v-for="(item, index) in dtmapNameList"
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
      for (let item of this.dtmapNameList) {
        console.log(item.name);
        if (item.value.getVisible()) {
          this.defaultMap = this.defaultMap.getIndexof(item);
        }
      }
    }
  },
  methods: {
    onDtChange(e) {
      let name = e.target.value;
      for (let item of this.dtmapNameList) {
        item.value.setVisible(false);
        if (item.name === name) {
          item.value.setVisible(true);
        }
      }
    }
  }
};
</script>

<style lang="scss">
.change-tab {
  border-radius: $borderRadius;
  width: 100%;
  font-size: $font-sm;
  @include flex-box(row, space-between, center);
  padding-top: 10px;
}
// 地图设置
.divider-title {
  @include flex-box(row, center, center);
  color: $green;
  padding: 20px 0;
  &:after {
    content: "";
    height: 0.5px;
    flex: 1;
    background-color: $borderGrey;
    margin-left: 10px;
    opacity: 0.3;
  }
  &:before {
    content: "";
    height: 0.5px;
    flex: 1;
    background-color: $borderGrey;
    margin-right: 10px;
    opacity: 0.3;
  }
}
.self-radio {
  @include flex-box(column, null, flex-start);
  .self-radio-item {
    width: 100%;
    padding-bottom: 10px;
    color: $textColor;
    @include flex-box(row-reverse, space-between);
  }
  .ant-radio-inner {
    background-color: $transparent;
  }
  .ant-radio-checked {
    .ant-radio-inner {
      border-color: $green;
      &::after {
        background-color: $green;
      }
    }
    &::after {
      border-color: $green;
    }
  }
  .ant-radio-wrapper:hover .ant-radio,
  .ant-radio:hover .ant-radio-inner,
  .ant-radio-input:focus + .ant-radio-inner {
    border-color: $green;
  }
}
</style>
